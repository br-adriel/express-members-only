import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.get('/login', authController.get_login);
authRoutes.post('/login', authController.post_login);

authRoutes.get('/logout', authController.get_logout);

authRoutes.get('/signup', authController.get_signup);
authRoutes.post('/signup', authController.post_signup);

export default authRoutes;
