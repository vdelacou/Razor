import { all, call, AllEffect } from 'redux-saga/effects';
import { crudFetch } from '../CrudFetch';

/**
 * if any action of type Crudaction we call crudfetch
 */
function* rootSagaFunction(): IterableIterator<AllEffect> {
    yield all([
        call(crudFetch),
    ]);
}

export const rootSaga = rootSagaFunction;
