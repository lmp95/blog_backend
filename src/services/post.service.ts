import { PostInterface } from '../interfaces/post.interface';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';

/**
 * Create new blog post
 * @param {PostInterface} post
 * @returns {Promise<PostInterface>}
 */
const createNewPost = async (post: PostInterface): Promise<PostInterface> => {
    const newPost = {
        ...post,
        createdBy: 'default',
        updatedBy: 'default',
    };
    return await PostModel.create(newPost);
};

/**
 * Get all blog post list
 * @returns {PostInterface[]}
 */
const getPosts = async (): Promise<PostInterface[]> => {
    return await PostModel.find();
};

export const PostServices = {
    createNewPost,
    getPosts,
};
