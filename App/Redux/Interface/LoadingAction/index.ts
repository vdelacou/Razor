
/** Interface Action Loading */
export interface LoadingAction {
    type: String; // one of the action defined above
}

/** Interface Action Loading with error */
export interface LoadingActionError {
    type: String;  // one of the action defined above mainly FETCH_ERROR
}
