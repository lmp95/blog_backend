import { isValidObjectId } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import PostModel from '../models/post.model';
import ApiError from '../utils/apiError';
import { CategoryInterface } from '../interfaces/category.interface';
import CategoryModel from '../models/category.model';

/**
 * Create new category
 * @param {CategoryInterface} category
 * @param {UserInterface} user
 * @returns {Promise<CategoryInterface>}
 */
const createNewCategory = async (category: CategoryInterface, user: UserInterface | any): Promise<CategoryInterface> => {
    const newCategory: CategoryInterface = {
        ...category,
        createdBy: user.username,
        updatedBy: user.username,
    };
    return await CategoryModel.create(newCategory);
};

/**
 * Get all categories
 * @returns {Promise<CategoryInterface>}
 */
const getCategoryList = async (): Promise<CategoryInterface[]> => {
    return CategoryModel.find();
};

/**
 *  delete category by Id
 * @param {string} categoryId
 * @returns {Promise<CategoryInterface>}
 */
const deleteCategoryById = async (categoryId: string): Promise<CategoryInterface> => {
    let deletedCategory: CategoryInterface;
    if (isValidObjectId(categoryId)) deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    if (deletedCategory) return deletedCategory;
    else throw new ApiError(400, 'Fail to delete');
};

export const CategoryServices = {
    createNewCategory,
    getCategoryList,
    deleteCategoryById,
};
