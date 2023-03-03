import { NextFunction, Request, Response } from 'express';

export function userAvailableInTemplate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.user = req.user;
  return next();
}

export function userMustBeAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) return next();
  return res.redirect('/');
}

export function userMustBeNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) return next();
  return res.redirect('/');
}
