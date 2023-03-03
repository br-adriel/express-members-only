import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { userMustBeAuthenticated } from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get(
  '/vip',
  userMustBeAuthenticated,
  userController.get_grant_user_VIP_acess
);

userRoutes.get('/:username', userController.get_user_profile);

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
