import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authValidation } from '../middlewares/validate';

const userRouter = Router();

userRouter.route('/').get(authValidation, UserController.getUsers);
userRouter.route('/').post(authValidation, UserController.createUser);

export default userRouter;
