import { NextFunction, Request, RequestHandler, Response } from 'express';

/*--------------------------------------------------------------------- 
  catchAsync is a Higher Order Function & fn is a callback function 
----------------------------------------------------------------------*/

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
