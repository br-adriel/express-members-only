import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';

/** Exibe perfil do usuário */
export const get_user_profile = async (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userProfile = await User.findOne({ username: req.params.username });
    if (userProfile) {
      return res.render('users/profile', {
        userProfile,
      });
    }
    return res.render('errorPage', {
      error: {
        status: 404,
        message: 'Usuário não encontrado',
      },
    });
  } catch (error) {
    return next(error);
  }
};

/** Exibe formulário de edição do usuário */
export const get_user_profile_edit = (
  req: Request<{ username: string }>,
  res: Response,
  next: NextFunction
) => {
  if (req.params.username !== req.user!.username) {
    return res.render('errorPage', {
      error: {
        status: 403,
        message: 'Você não tem permissões para editar esse usuário',
      },
    });
  }
  return res.render('users/editProfile', {
    formData: {
      firstName: req.user!.firstName,
      lastName: req.user!.lastName,
    },
  });
};

/** Renderiza formulário para solicitar acesso VIP */
export const get_grant_user_VIP_acess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('users/getVIP');
};

/** Salva as modificações feitas no perfil do usuário */
export const post_grant_user_VIP_access = [
  body('accessCode')
    .isLength({ min: 8 })
    .custom((value) => {
      return value === process.env.VIP_CODE;
    })
    .withMessage('Código incorreto'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('users/getVIP', {
        errors: errors.array(),
      });
    }

    try {
      await User.updateOne(
        { username: req.user?.username },
        { hasMembership: true }
      );
      return res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
];

/** Salva as modificações feitas no perfil do usuário */
export const post_user_profile_edit = [
  body('firstName')
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage('O nome deve ter de 2 a 30 carcteres'),

  body('lastName')
    .trim()
    .escape()
    .isLength({ min: 2, max: 30 })
    .withMessage('O sobrenome deve ter de 2 a 30 carcteres'),

  async (
    req: Request<
      { username: string },
      {},
      { firstName: string; lastName: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    if (req.params.username !== req.user!.username) {
      return res.render('errorPage', {
        error: {
          status: 403,
          message: 'Você não tem permissões para editar esse usuário',
        },
      });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('users/editProfile', {
          formData: req.body,
          errors: errors.array(),
        });
      }

      const newInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      await User.updateOne({ username: req.params.username }, newInfo, {});

      return res.redirect('/users/' + req.user?.username);
    } catch (error) {
      return next(error);
    }
  },
];
