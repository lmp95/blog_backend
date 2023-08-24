import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';
import { PostServices } from '../services/post.service';
import { JwtPayload, verify } from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { UserServices } from '../services/user.service';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const decoded = verify(req.headers.authorization.split('Bearer ')[1], process.env.JWT_SECRET) as JwtPayload;
    const autherEmail = decoded?.email;
    try {
        const author = await UserServices.getUserByEmail(autherEmail);
        if (author && author.role === 'Author') {
            const createdPost = await PostServices.createNewPost({ ...req.body, author: author.username });
            res.send(createdPost);
        }
        throw new ApiError(403, 'Access Denied.');
    } catch (error) {
        next(error);
    }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostServices.getPosts();
        res.send(posts);
    } catch (error) {
        throw new ApiError(400, 'Fail to get posts');
    }
};

const getPostDetailById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await PostServices.getPostDetailById(req.params.postId);
        res.send(post);
    } catch (error) {
        next(error);
    }
};

const updatePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await PostServices.updatePostById(req.params.postId, req.body, req.user);
        res.send(post);
    } catch (error) {
        next(error);
    }
};

const deletePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostServices.deletePostById(req.params.postId);
        res.send(posts);
    } catch (error) {
        next(error);
    }
};

export const PostController = {
    createPost,
    getPosts,
    getPostDetailById,
    updatePostById,
    deletePostById,
};
