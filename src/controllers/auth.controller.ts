import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';
import User from '../models/User';

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
export const post_signup = [
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

  body('username')
    .trim()
    .escape()
    .isLength({ min: 5, max: 30 })
    .withMessage('O username deve ter de 5 a 30 carcteres'),

  body('password')
    .escape()
    .isStrongPassword()
    .withMessage(
      'Sua senha deve ter pelo menos 8 caracteres e deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo'
    )
    .custom((value, { req }) => value === req.body['password2'])
    .withMessage('As senhas não são iguais'),

  async (
    req: Request<
      {},
      {},
      {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        passwrod2: string;
      }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      const errorsArray = errors.array();

      const user = await User.findOne({ username: req.body.username });
      if (user)
        errorsArray.push({
          value: req.body.username,
          msg: 'Esse nome de usuário já está em uso',
          param: 'username',
          location: 'body',
        });

      if (!errors.isEmpty() || user) {
        console.log(errorsArray);
        return res.render('auth/signup', {
          errors: errorsArray,
          formData: req.body,
        });
      }

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
      });
      await newUser.save();

      return res.render('auth/login', {
        messages: ['Conta criada com sucesso, você já pode realizar login'],
      });
    } catch (err) {
      return next(err);
    }
  },
];
