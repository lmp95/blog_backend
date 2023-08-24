import { Router } from 'express';
import { authValidation, roleValidation } from '../middlewares/validate';
import { PostController } from '../controllers/post.controller';
import { APP_USER_ROLES } from '../config/userRole';

const postRouter = Router();

postRouter.route('/').all(authValidation).get(PostController.getPosts).post(PostController.createPost);
postRouter
    .route('/:postId')
    .all(authValidation)
    .put(roleValidation(APP_USER_ROLES.AUTHOR), PostController.updatePostById)
    .delete(roleValidation(APP_USER_ROLES.AUTHOR), PostController.deletePostById)
    .get(PostController.getPostDetailById);

export default postRouter;
