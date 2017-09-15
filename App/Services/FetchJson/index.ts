import { HttpError } from '../Interface';

/**
 * Function to manage globaly the fetch and the api call request and answer
 */

/** Interface to store the response return by the API */
export interface ResponseApi {
    status: number;
    header: Headers;
    body: Object;
}

/** Interface for the Model of error return by the API */
interface ApiResponseError {
    message: String;
}

/**
 * This function call do the fecth with all headers needed
 * If error occurs the promise is rejected
 *
 * @param {String} url the Url to call with the fetch
 * @returns {Promise<ResponseApi>} the Promise with the api response
 */
export async function fetchJson(url: string): Promise<ResponseApi> {

    // add the Accept and content-type header
    const requestHeaders = new Headers({ 'Accept': 'application/json' });
    requestHeaders.set('Content-Type', 'application/json');

    // can add Authorization token here for example

    // create the request
    const request = new Request(
        url,
        { headers: requestHeaders },
    );

    // call the api url with fetch
    return fetch(request)
        // get the response and return our object ResponseApi
        .then(function (response: Response): Promise<ResponseApi> {
            // if status 204 means the body will be empty
            if (response.status === 204) {
                return Promise.apply({
                    status: response.status,
                    header: response.headers,
                    body: {},
                });
            }
            // if not we read the body as json
            return response.json().then(function (json: Object & ApiResponseError): ResponseApi {
                // if not in 200 means an error occurs
                if (response.status < 200 || response.status >= 300) {
                    throw new HttpError(' Error ' + json.message + ' for url: ' + url, response.status);
                }
                // if all ok we return our object ApiResponse
                return {
                    status: response.status,
                    header: response.headers,
                    body: json,
                };
            },
            );
        },
    );
}
