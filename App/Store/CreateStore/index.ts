import { createStore, combineReducers, Store, applyMiddleware, compose, Reducer } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { AllEffect } from 'redux-saga/effects';
import { persistStore, PersistorConfig } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { logger } from 'redux-logger';
// app component
import { rootSaga } from '../../Sagas';
import { REDUX_PERSIST } from '../../Config';
import { loadingReducer, beverageReducer } from '../../Redux';


const updateReducers = <S>(store: Store<S>) => {
    const reducerVersion = REDUX_PERSIST.reducerVersion;
    const config: PersistorConfig = REDUX_PERSIST.storeConfig;

    // Check to ensure latest reducer version
    AsyncStorage.getItem('reducerVersion').then((localVersion) => {
        if (localVersion !== reducerVersion) {
            // Purge store
            persistStore(store, config).purge();
            AsyncStorage.setItem('reducerVersion', reducerVersion);
        } else {
            persistStore(store, config);
        }
    }).catch(() => {
        persistStore(store, config);
        AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

// creates the store
function createGenericStore<S>(rootReducer: Reducer<S>, sagaFunction: () => IterableIterator<AllEffect>): Store<S> {

    /* ------------- Redux Configuration ------------- */
    const middleware = [];
    const enhancers = [];

    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    /* ------------- Logger Middleware ------------- */
    middleware.push(logger);

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    /* ------------- AutoRehydrate Enhancer ------------- */
    if (REDUX_PERSIST.active) {
        // add the autoRehydrate enhancer
        enhancers.push(autoRehydrate());
    }

    const store = createStore(rootReducer, compose(...enhancers));

    // configure persistStore and check reducer version number
    if (REDUX_PERSIST.active) {
        updateReducers(store);
    }

    // kick off root saga
    sagaMiddleware.run(sagaFunction);

    return store;
}

/* ------------- Assemble The Reducers ------------- */
const customRootReducer = combineReducers({
    beverageReducer: beverageReducer,
    loadingReducer: loadingReducer,
});

export const createCustomStore: Store<{}> = createGenericStore(customRootReducer, rootSaga);

