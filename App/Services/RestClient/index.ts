import { fetchJson, ResponseApi } from '../FetchJson';
import { Beverage } from '../../Models';
import { REST } from '../../Config';

/**
 * Set of functions to convert request and response after calling the service fetchJson
 */

export const GET_BEVERAGE: String = 'GET_BEVERAGE';

/** Interface to store the response from the api call */
export interface ResponseRest {
    data: Object;
}

/** Interface to call the fetch with all option and url */
interface RestRequest {
    url: string;
    options: Object;
}

/**
 * This function construct the url and the options needed for the fetch according to the type of actions received
 *
 *  @param {String} type Request type, e.g GET_USER_INFO
 *  @param {Object} params The REST request params, depending on the type
 *  @returns {RestRequest} { url, options } The HTTP request parameters
 */
function convertRESTRequestToHTTP(type: String, _params: Object): RestRequest {
    let url = '';
    const options: Object = {};
    switch (type) {
        // only one action here for the moment, and so one url
        case GET_BEVERAGE:
            url = `${REST.baseUrl}`;
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
}

/**
 * This function convert the response received by the api according to the type of action
 *
 * @param {Object} response HTTP response from fetch()
 * @param {String} type Request type, e.g GET_USER_INFO
 * @returns {ResponseRest} REST response
 */
function convertHTTPResponseToREST(response: ResponseApi, type: String): ResponseRest {
    const { body } = response;
    switch (type) {
        // only one action here for the moment, and so response type
        case GET_BEVERAGE:
            const beverage: Array<Beverage> = body as Array<Beverage>;
            return {
                data: beverage,
            };
        default:
            return { data: body };
    }
}


/**
 * This function call the api and return the result
 *
 * @param {String} type Request type, e.g GET_BEVERAGE
 * @param {Object} params Request parameters. Depends on the request type
 * @returns {Promise<ResponseRest>} the Promise for a REST response
 */
export function restClient(type: String, params: Object): Promise<ResponseRest> {

    const { url } = convertRESTRequestToHTTP(type, params);
    return fetchJson(url)
        .then((response: ResponseApi) =>
            convertHTTPResponseToREST(response, type));
}
