import { Router } from 'express';
import { authValidation, roleValidation } from '../middlewares/validate';
import { APP_USER_ROLES } from '../config/userRole';
import { CategoryController } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter
    .route('/')
    .get(CategoryController.getCategories)
    .all(authValidation, roleValidation(APP_USER_ROLES.ADMIN))
    .post(CategoryController.createCategory);
categoryRouter
    .route('/:categoryId')
    .all(authValidation, roleValidation(APP_USER_ROLES.ADMIN))
    .delete(roleValidation(APP_USER_ROLES.AUTHOR), CategoryController.deleteCategory);

export default categoryRouter;
