class ApiResponse {
    statusCode: number;
    data: any[]; 
    message: any;
    success: boolean;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        data: any[] = []
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };

// Define types separately
type ApiResponseConstructorParams = {
    statusCode: number;
    message?: any;
    data?: any[];
};

type ApiResponseInstance = ApiResponse;
