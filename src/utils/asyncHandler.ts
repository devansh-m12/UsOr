import { RequestHandler } from 'express';

const asyncHandler = (requestHandler: RequestHandler) => {
    return (req?: any, res?: any, next?: any) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };

type AsyncHandlerRequestHandler = RequestHandler;
