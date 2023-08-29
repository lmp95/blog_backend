import { Types, isValidObjectId } from 'mongoose';
import { PostInterface } from '../interfaces/post.interface';
import { UserInterface } from '../interfaces/user.interface';
import PostModel from '../models/post.model';
import ApiError from '../utils/apiError';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { searchRegexMatch } from '../queries/common';
import { postDetailQuery, postListQuery } from '../queries/post.query';
import { POST_STATUS } from '../config/userRole';

/**
 * Create new blog post
 * @param {PostInterface} post
 * @param {UserInterface} user
 * @returns {Promise<PostInterface>}
 */
const createNewPost = async (post: PostInterface, user: UserInterface | any): Promise<PostInterface> => {
    const newPost: PostInterface = {
        ...post,
        author: user._id,
        createdBy: user.username,
        updatedBy: user.username,
    };
    return await PostModel.create(newPost);
};

/**
 * Update blog post
 * @param {string} postId
 * @param {PostInterface} post
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
 * @param {string} filter
 * @returns {Promise<DataTableInterface>}
 */
const getPosts = async (search: string, limit: string, page: string, filter: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    let filters = [];
    let match = {};
    if (filter) {
        filters.push({
            category: new Types.ObjectId(filter),
        });
    }
    filters.push({ status: POST_STATUS.PUBLISHED });
    match = { $and: filters, ...searchRegexMatch({ field: 'title', search: search }) };

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
 * Get author's posts
 * @param {string} authorId
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<DataTableInterface>}
 */
const getPostsByAuthor = async (authorId: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    const match = { author: new Types.ObjectId(authorId) };
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
    let post: PostInterface[];
    if (isValidObjectId(postId)) {
        post = await PostModel.aggregate(postDetailQuery({ match: { _id: new Types.ObjectId(postId) } }));
    }
    if (post.length > 0) return post.at(0);
    else throw new ApiError(400, 'Post is not available.');
};

export const PostServices = {
    createNewPost,
    getPosts,
    updatePostById,
    deletePostById,
    getPostDetailById,
    getPostsByAuthor,
};
