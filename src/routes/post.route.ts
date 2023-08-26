import { Router } from 'express';
import { authValidation, roleValidation } from '../middlewares/validate';
import { PostController } from '../controllers/post.controller';
import { APP_USER_ROLES } from '../config/userRole';

const postRouter = Router();

postRouter.route('/').get(PostController.getPosts).post(authValidation, roleValidation, PostController.createPost);
postRouter
    .route('/:postId')
    .get(PostController.getPostDetailById)
    .all(authValidation)
    .put(roleValidation(APP_USER_ROLES.AUTHOR), PostController.updatePostById)
    .delete(roleValidation(APP_USER_ROLES.AUTHOR), PostController.deletePostById);

export default postRouter;
