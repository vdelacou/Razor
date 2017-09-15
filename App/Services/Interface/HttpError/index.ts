
/**
 * This class represent error than can occurs during fetch
 *
 */
class HttpErrorClass extends Error {

    status: number;

    public constructor(message: string, status: number) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;
        this.stack = (new Error(message)).stack;
    }
}

export const HttpError = HttpErrorClass;

export interface HttpError extends Error {
    status: number;
}


