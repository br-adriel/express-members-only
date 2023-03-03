import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { userMustBeAuthenticated } from '../middlewares/auth.middleware';

const postRoutes = Router();

postRoutes.get('/', userMustBeAuthenticated, postController.get_posts);

postRoutes.post('/new', userMustBeAuthenticated, postController.post_new_post);
postRoutes.post(
  '/:id/remove',
  userMustBeAuthenticated,
  postController.post_remove_post
);

export default postRoutes;
