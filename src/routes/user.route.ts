import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authValidation, roleValidation } from '../middlewares/validate';
import { APP_USER_ROLES } from '../config/userRole';

const userRouter = Router();

userRouter.route('/').all(authValidation, roleValidation(APP_USER_ROLES.ADMIN)).get(UserController.getUsers).post(UserController.createUser);

export default userRouter;
