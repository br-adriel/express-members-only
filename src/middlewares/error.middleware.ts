import { NextFunction, Request, Response } from 'express';

export const ErrorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('errorPage', {
    error: {
      status: 500,
      message: 'Um erro ocorreu, tente novamente daqui a pouco',
    },
  });
};
