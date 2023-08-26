import { isValidObjectId } from 'mongoose';
import { PostInterface } from '../interfaces/post.interface';
import { UserInterface } from '../interfaces/user.interface';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';
import ApiError from '../utils/apiError';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { searchRegexMatch } from '../queries/common';
import { postListQuery } from '../queries/post.query';

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
 * Update blog post
 * @param {string} postId
 * @param {PostInterface} updatePost
 * @param {UserInterface} user
 * @returns {Promise<PostInterface>}
 */
const updatePostById = async (postId: string, post: PostInterface, user: UserInterface | any): Promise<PostInterface> => {
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
            ...post,
            updatedBy: user.username,
            updatedDate: new Date(),
        },
        { new: true }
    );
    if (updatedPost) return updatedPost;
    else throw new ApiError(400, 'Fail to update post');
};

/**
 * get category total count
 * @returns {Promise<number>}
 */
const getPostTotalCount = async (searchQuery?: object): Promise<number> => {
    const result = await PostModel.aggregate([
        {
            $match: searchQuery || {},
        },
        {
            $count: 'total',
        },
    ]);
    return result[0]?.total;
};

/**
 * Get all post
 * @param {string} search
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<DataTableInterface>}
 */
const getPosts = async (search: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    const match = searchRegexMatch({ field: 'title', search: search });
    await Promise.all([getPostTotalCount(match), PostModel.aggregate(postListQuery({ match: match, currentPage: currentPage, perPage: perPage }))]).then(
        (values) => {
            data = {
                data: values[1],
                page: currentPage,
                perPage: perPage,
                total: values[0],
            };
        }
    );
    return data;
};

/**
 *  delete post by Id
 * @param {string} postId
 * @returns {Promise<PostInterface>}
 */
const deletePostById = async (postId: string): Promise<PostInterface> => {
    let deletedPost: PostInterface;
    if (isValidObjectId(postId)) deletedPost = await PostModel.findByIdAndDelete(postId);
    if (deletedPost) return deletedPost;
    else throw new ApiError(400, 'Fail to delete');
};

/**
 * get post by title
 * @param {string} postId
 * @returns {Promise<PostInterface>}
 */
const getPostDetailById = async (postId: string): Promise<PostInterface> => {
    let post: PostInterface;
    if (isValidObjectId(postId)) {
        post = await PostModel.findById(postId);
    }
    if (post) return post;
    else throw new ApiError(400, 'Post is not available.');
};

/**
 * get post total count
 * @returns {Promise<number>}
 */
const getCategoryTotalCount = async (): Promise<number> => {
    return await PostModel.find().count();
};

export const PostServices = {
    createNewPost,
    getPosts,
    updatePostById,
    deletePostById,
    getPostDetailById,
};
