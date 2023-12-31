import mongoose, { Types } from 'mongoose';
import defaultFields from './default.model';
import { PostInterface } from '../interfaces/post.interface';
import { POST_STATUS } from '../config/userRole';

const PostSchema = new mongoose.Schema<PostInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(POST_STATUS),
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: Types.ObjectId,
            required: true,
        },
        author: {
            type: Types.ObjectId,
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
