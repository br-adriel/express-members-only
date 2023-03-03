import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post';
import PostModel from '../models/Post';

/** Renderiza todos os posts */
export const get_posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .populate('author');
    return res.render('posts/all_posts', { posts });
  } catch (err) {
    return next(err);
  }
};

/** Cria um novo post */
export const post_new_post = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 3, max: 70 })
    .withMessage(
      'O título da postagem deve ter no mínimo 3 e no máximo 70 caracteres'
    ),

  body('content')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('O conteúdo da postagem deve ter no máxio 500 caracteres'),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const posts = await Post.find({})
          .sort({ createdAt: -1 })
          .populate('author');
        return res.render('posts/all_posts', {
          posts,
          formData: req.body,
          errors: errors.array(),
        });
      }

      const newPost = new Post({
        author: req.user,
        title: req.body.title,
        content: req.body.content,
      });
      await newPost.save();
      return res.redirect('/posts');
    } catch (err) {
      return next(err);
    }
  },
];

/** Remove um post */
export const post_remove_post = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  return res.send(`POST ${req.params.id} REMOVED`);
};
