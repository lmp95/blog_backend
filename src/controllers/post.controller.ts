import { NextFunction, Request, Response } from 'express';
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
        next(error);
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
