import { Router } from 'express';
import { authValidation } from '../middlewares/validate';
import { PostController } from '../controllers/post.controller';

const postRouter = Router();

postRouter.route('/').all(authValidation).get(PostController.getPosts).post(PostController.createPost);
postRouter.route('/:postId').all(authValidation).put(PostController.updatePostById).delete(PostController.deletePostById).get(PostController.getPostDetailById);

export default postRouter;
