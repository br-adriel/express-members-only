import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/:username', userController.get_user_profile);

userRoutes.get('/:username/edit', userController.get_user_profile_edit);
userRoutes.post('/:username/edit', userController.post_user_profile_edit);

export default userRoutes;
