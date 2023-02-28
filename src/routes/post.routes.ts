import { Router } from 'express';
import * as postController from '../controllers/post.controller';

const postRoutes = Router();

postRoutes.get('/', postController.get_posts);

postRoutes.get('/new', postController.post_new_post);
postRoutes.post('/:id/remove', postController.post_remove_post);

export default postRoutes;
