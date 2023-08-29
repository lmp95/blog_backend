import { NextFunction, Request, Response } from 'express';
import { CategoryServices } from '../services/category.service';
import { controllerHandler } from '../utils/utils';

const createCategory = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(CategoryServices.createNewCategory(req.body, req.user), res, next);
};

const getCategories = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(CategoryServices.getCategoryList(), res, next);
};

const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(CategoryServices.deleteCategoryById(req.params.categoryId), res, next);
};

export const CategoryController = {
    createCategory,
    deleteCategory,
    getCategories,
};
