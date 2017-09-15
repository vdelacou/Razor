import { put, call, cancelled, takeEvery, takeLatest, all, AllEffect } from 'redux-saga/effects';
// app component
import { restClient, GET_BEVERAGE } from '../../Services';
import { CrudAction, fetchStart, fetchEnd, fetchError, fetchCancel, getBeverageFinish } from '../../Redux';

/**
 * This function launch other action to indicate the steps the fetch are going threw
 * The actions launched are mainly LoadingReducer actions
 *
 * @param {CrudAction} action the action for fetch (the meta and type help to call the correct fetch)
 */
function* handleFetch(action: CrudAction) {
    // we get the details from the actions
    const { payloadResponse, metaRequest: { fetch: fetchMeta } } = action;
    const restType = fetchMeta;

    // we launch action to inform app that the fetch start
    yield put(fetchStart());
    let response;
    try {
        // we call the function restClient with the given parameters
        response = yield call(restClient, restType, payloadResponse);
        // the response if every has been correct must have a data key
        if (!response.data) {
            throw new Error('REST response must contain a data key');
        }
        // if all ok we send the data we get the proper reducer action
        if (restType === GET_BEVERAGE) {
            yield put(getBeverageFinish(response));
        }
        // we launch action to inform app that the fetch end
        yield put(fetchEnd());
    } catch (error) {
        // we launch action to inform app that the fetch get error
        console.log(`FETCH ERROR ${error}`);
        yield put(fetchError());
    } finally {
        // if action with cancelprevious to true is launch, then we cancel the current action
        if (yield cancelled()) {
            // we launch action to inform app that the fetch get cancelled
            yield put(fetchCancel());
            return 0;
        }
    }
}

/**
 * if any action of type Crudaction as metarequest and fetch command we start some others actions in respond to this action
 * if the user pass the cancel previous as true, then only the last action is used, if not every action are lauched one by one
 */
export function* crudFetch(): IterableIterator<AllEffect> {
    yield all([
        takeLatest(
            (action: CrudAction) => action.metaRequest && action.metaRequest.fetch && action.metaRequest.cancelPrevious,
            handleFetch),
        takeEvery(
            (action: CrudAction) => action.metaRequest && action.metaRequest.fetch && !action.metaRequest.cancelPrevious,
            handleFetch),
    ]);
}
