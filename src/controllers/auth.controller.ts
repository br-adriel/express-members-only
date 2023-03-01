import { NextFunction, Request, Response } from 'express';

/** Renderiza página de login */
export const get_login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('auth/login');
};

/** Renderiza página de cadastro */
export const get_signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('auth/signup');
};

/** Faz logout do usuário */
export const get_logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('USER LOGGED OUT');
};

/** Faz login do usuário */
export const post_login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send(`USER LOGGED IN`);
};

/** Cria novo usuário */
export const post_signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send(`NEW USER SIGNED UP`);
};
