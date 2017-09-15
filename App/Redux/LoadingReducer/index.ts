
/** This reducer allow us to know if the app is still waiting for some fetch answer
 * of if some fetch are still loading.
 * We add all the fetch in a counter in case of multiple fetch
 */

/** All Action Types */
export const FETCH_START: String = 'FETCH_START';
export const FETCH_END: String = 'FETCH_END';
export const FETCH_ERROR: String = 'FETCH_ERROR';
export const FETCH_CANCEL: String = 'FETCH_CANCEL';

/** Interface Action Loading */
export interface LoadingAction {
    type: String; // one of the action defined above
}

/** Interface Action Loading with error */
export interface LoadingActionError {
    type: String;  // one of the action defined above mainly FETCH_ERROR
}

/** Interface State for Loading */
export interface LoadingState {
    // if zero means no loading, when application start it's equal to -1, more than zero means we have something still waiting answer
    loadingState: number;
    // if we get an error during fetch, this boolean is true
    fetchError: boolean;
}

/** Action Creator when fetch start */
export function fetchStart(): LoadingAction {
    return {
        type: FETCH_START,
    };
}
/** Action Creator when fetch end */
export function fetchEnd(): LoadingAction {
    return {
        type: FETCH_END,
    };
}
/** Action Creator when fetch with error */
export function fetchError(): LoadingActionError {
    return {
        type: FETCH_ERROR,
    };
}
/** Action Creator when fetch cancel */
export function fetchCancel(): LoadingAction {
    return {
        type: FETCH_CANCEL,
    };
}

/** Initial State */
const initialState: LoadingState = {
    // when start application nothing have been fetch so we put -1. So it's easy to know we just launch the app.
    // Then at each fetch this number will be increased. When all fetch have been finish, in error or cancelled, this number will be at zero
    loadingState: -1,
    fetchError: false, // if any error appears this will be true
};

/** Reducer for loading. Take the state, and action and return the state updated if needed */
export function loadingReducer(previousState: LoadingState = initialState, action: LoadingAction): LoadingState {
    switch (action.type) {
        case FETCH_START:
            return {
                // is start to fecth we add 1 to current state with a minimum of 1
                loadingState: Math.max(previousState.loadingState + 1, 1),
                fetchError: false,
            };
        case FETCH_ERROR:
            return {
                // if error during fetch we reduce 1 to the state and put fetch error to true until the next fetch
                loadingState: Math.max(previousState.loadingState - 1, 0),
                fetchError: true,
            };
        case FETCH_END:
        case FETCH_CANCEL:
            return {
                // if finish or cancel  we reduce 1 to the state with a minimum of zero
                loadingState: Math.max(previousState.loadingState - 1, 0),
                fetchError: false,
            };
        default:
            return previousState;
    }
}
