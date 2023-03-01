import { NextFunction, Request, Response } from 'express';

/** Renderiza todos os posts */
export const get_posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('posts/all_posts');
};

/** Cria um novo post */
export const post_new_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send(`NEW POST CREATED`);
};

/** Remove um post */
export const post_remove_post = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  return res.send(`POST ${req.params.id} REMOVED`);
};
