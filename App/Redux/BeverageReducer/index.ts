import { GET_BEVERAGE, ResponseRest } from '../../Services';
import { CrudAction, MetaRequest } from '../Interface';
import { Beverage } from '../../Models';

/** Action Types for Beverage */
const Beverage_GET_BEVERAGE: String = 'Beverage_GET_BEVERAGE';
const Beverage_GET_BEVERAGE_FINISH: String = 'Beverage_GET_BEVERAGE_FINISH';

/** Interface Action to ask beverage */
export interface GetBeverageAction extends CrudAction {
    // we put it mandatory (it's not in CrudAction)
    metaRequest: MetaRequest;
}

/** Interface Action when beverage is retrieved */
interface BeverageFinishAction extends CrudAction {
    // we put it mandatory (it's not in CrudAction)
    payloadResponse: Object;
}

/** Interface State return by reducer */
export interface BeverageState {
    beverages: Array<Beverage>;
}

/**
 * Action Creator to get beverage with the api
 *
 * @param {boolean} cancelPrevious if need the cancel all the previous call
 * @returns {GetBeverageAction} return action to get beverage
 */
export function getBeverage(cancelPrevious: boolean = true): GetBeverageAction {
    return {
        type: Beverage_GET_BEVERAGE,
        // thanks to the metaRequest, the fetch know which url call and wich object to expect in return
        metaRequest: { fetch: GET_BEVERAGE, cancelPrevious: cancelPrevious },
    };
}

/**
 * Action Creator when we got the beverage list
 *
 * @param {Array<Beverage>} beverage the beverage list got from the api call
 * @returns {BeverageFinishAction} return action when finish to get beverage
 */
export function getBeverageFinish(beverages: Array<Beverage>): BeverageFinishAction {
    return {
        type: Beverage_GET_BEVERAGE_FINISH,
        payloadResponse: beverages as Array<Beverage>,
    };
}

/** Initial State */
// at the beginning we consider the beverage list as empty
const initialState: BeverageState = {
    beverages: new Array<Beverage>(),
};

/**
 *  Reducer for manage beverage api. Take the state, and action and return the state updated if needed
 *
 * @param {BeverageState} previousState the state before call the reducer, if null we use initial state
 * @param {CrudAction} action the action to call fetch
 * @returns {BeverageState} the state updated after the api call
 */
export function beverageReducer(previousState: BeverageState = initialState, action: CrudAction): BeverageState {
    switch (action.type) {
        // if finish the we store in the state the api response
        case Beverage_GET_BEVERAGE_FINISH:
            let payloadState: BeverageState = previousState as BeverageState;
            // get the beverage list in the payload
            const responseRest: ResponseRest = action.payloadResponse as ResponseRest;
            payloadState.beverages = responseRest.data as Array<Beverage>;
            return payloadState;
        default:
            return previousState;
    }
}



