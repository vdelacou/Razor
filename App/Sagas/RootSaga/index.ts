import { all, call, AllEffect } from 'redux-saga/effects';
import { crudFetch } from '../CrudFetch';

function* rootSagaFunction(): IterableIterator<AllEffect> {
    // if any action of type Crudaction we call crudfetch
    yield all([
        call(crudFetch),
    ]);
}

export const rootSaga = rootSagaFunction;
