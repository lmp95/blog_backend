import mongoose from 'mongoose';
import defaultFields from './default.model';
import { CategoryInterface } from '../interfaces/category.interface';

const CategorySchema = new mongoose.Schema<CategoryInterface>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);
const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
