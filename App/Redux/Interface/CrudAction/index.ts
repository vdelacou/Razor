
/** Interface Meta to give to the fetch service to know which api call */
export interface MetaRequest {
    // the action the fetch need to execute
    fetch: String;
    // if need to cancel all other fetch and take care only of the last one (threw saga)
    cancelPrevious: boolean;
}

/** Interface Action for all Crud action */
export interface CrudAction {
    // the action received after the fetch
    type: String;
    // the object we got in response after the request
    payloadResponse?: Object;
    // some data for detch service to know what to do
    metaRequest?: MetaRequest;
}
