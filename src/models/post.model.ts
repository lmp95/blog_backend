import mongoose from 'mongoose';
import defaultFields from './default.model';
import { PostInterface } from '../interfaces/post.interface';

const PostSchema = new mongoose.Schema<PostInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
