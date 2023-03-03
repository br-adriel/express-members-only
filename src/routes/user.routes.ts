import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { userMustBeAuthenticated } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get(
  '/:username',
  userMustBeAuthenticated,
  userController.get_user_profile
);

userRoutes.get(
  '/:username/edit',
  userMustBeAuthenticated,
  userController.get_user_profile_edit
);
userRoutes.post(
  '/:username/edit',
  userMustBeAuthenticated,
  userController.post_user_profile_edit
);

export default userRoutes;
