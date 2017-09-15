import { GET_BEVERAGE, ResponseRest } from '../../Services';
import { Beverage } from '../../Models';

/** Action Types */
const Beverage_GET_BEVERAGE: String = 'Beverage_GET_BEVERAGE';
const Beverage_GET_BEVERAGE_FINISH: String = 'Beverage_GET_BEVERAGE_FINISH';

/** Interface Meta to give to the fetch service to know which api call */
interface MetaRequest {
    // the action the fetch need to execute
    fetch: String;
    // if need to cancel all other fetch and take care only of the last one
    cancelPrevious: boolean;
}

/** Interface Action to ask beverage */
interface GetBeverageAction {
    type: String;
    metaRequest: MetaRequest;
}

/** Interface Action when beverage is retrieved */
interface BeverageFinishAction {
    type: String;
    payloadRequest: Object;
}

/** Interface State return by reducer */
export interface BeverageState {
    beverage: Array<Beverage>;
}

/**
 * Action Creator to get beverage with the api
 *
 * @param {boolean} cancelPrevious the Url to call with the fetch
 * @returns {GetBeverageAction} the Promise with the api response
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
 * @param {Beverage} beverage the Url to call with the fetch
 * @returns {BeverageFinishAction} the Promise with the api response
 */
export function getBeverageFinish(beverage: Beverage): BeverageFinishAction {
    return {
        type: Beverage_GET_BEVERAGE_FINISH,
        payloadRequest: beverage as Beverage,
    };
}

/** Initial State */
// at the beginning we consider the beverage list as empty
const initialState: BeverageState = {
    beverage: new Array<Beverage>(),
};

/**
 *  Reducer for manage beverage api. Take the state, and action and return the state updated if needed
 *
 * @param {BeverageState} previousState the Url to call with the fetch
 * @param {GetBeverageAction & BeverageFinishAction} action the Url to call with the fetch
 * @returns {BeverageState} the Promise with the api response
 */
export function beverageReducer(previousState: BeverageState = initialState, action: GetBeverageAction & BeverageFinishAction): BeverageState {
    switch (action.type) {
        // if finish the we store in the state the api response
        case Beverage_GET_BEVERAGE_FINISH:
            let payloadState: BeverageState = previousState as BeverageState;
            const responseRest: ResponseRest = action.payloadRequest as ResponseRest;
            payloadState.beverage = responseRest.data as Array<Beverage>;
            return payloadState;
        default:
            return previousState;
    }
}



