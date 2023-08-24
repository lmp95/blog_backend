import { Router } from 'express';
import { authValidation } from '../middlewares/validate';
import { PostController } from '../controllers/post.controller';

const postRouter = Router();

postRouter.route('/').get(authValidation, PostController.getPosts);
postRouter.route('/').post(authValidation, PostController.createPost);

export default postRouter;
