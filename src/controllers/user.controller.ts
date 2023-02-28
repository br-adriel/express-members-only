import { NextFunction, Request, Response } from 'express';

/** Exibe perfil do usuário */
export const get_user_profile = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  return res.send(`USER "${req.params.username}" PROFILE`);
};

/** Exibe formulário de edição do usuário */
export const get_user_profile_edit = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  return res.send(`EDIT USER "${req.params.username}" PROFILE`);
};

/** Salva as modificações feitas no perfil do usuário */
export const post_user_profile_edit = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  return res.send(`USER "${req.params.username}" PROFILE UPDATED`);
};
