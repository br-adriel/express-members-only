import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { default as Post, default as PostModel, IPost } from '../models/Post';

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
    .isLength({ max: 500 })
    .withMessage('O conteúdo da postagem deve ter no máximo 500 caracteres')
    .escape(),

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

/** Renderiza formulário de confirmação de remoção de post */
export const get_remove_post = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = (await Post.findById(req.params.id).populate(
      'author'
    )) as IPost & {
      author: Express.User;
    };
    if (post) {
      if (req.user?.isAdmin) {
        return res.render('posts/confirmRemove', {
          post,
        });
      }
      return res.render('errorPage', {
        error: {
          status: 403,
          message: 'Você não tem permissões para excluir esse post',
        },
      });
    }
    return res.render('errorPage', {
      error: {
        status: 404,
        message: 'O post que você está tentando apagar não existe',
      },
    });
  } catch (err) {
    return next(err);
  }
};

/** Remove um post */
export const post_remove_post = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.isAdmin) {
      await Post.findOneAndRemove({ _id: req.params.id });
      return res.redirect('/');
    }
    return res.render('errorPage', {
      error: {
        status: 403,
        message: 'Você não tem permissões para excluir esse post',
      },
    });
  } catch (err) {
    return next(err);
  }
};
