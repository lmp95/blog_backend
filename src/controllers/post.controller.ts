import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';
import { PostServices } from '../services/post.service';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdPost = await PostServices.createNewPost(req.body);
        res.send(createdPost);
    } catch (error) {
        next(error);
    }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostServices.getPosts();
        res.send(posts);
    } catch (error) {
        throw new ApiError(400, 'Fail to retrieve users');
    }
};

export const PostController = {
    createPost,
    getPosts,
};
