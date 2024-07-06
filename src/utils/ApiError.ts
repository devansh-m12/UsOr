class ApiError extends Error {
    statusCode: number;
    data: null | any; 
    message: string;
    success: boolean;
    errors: any[]; 

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };

// Define types separately
type ApiErrorConstructorParams = {
    statusCode: number;
    message?: string;
    errors?: any[];
    stack?: string;
};

type ApiErrorInstance = ApiError;
