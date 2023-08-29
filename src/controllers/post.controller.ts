import { NextFunction, Request, Response } from 'express';
import { PostServices } from '../services/post.service';
import { controllerHandler } from '../utils/utils';

const createPost = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(PostServices.createNewPost(req.body, req.user), res, next);
};

const getPosts = (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search?.toString();
    controllerHandler(PostServices.getPosts(search as string, req.query.limit as string, req.query.page as string, req.query.filter as string), res, next);
};

const getPostDetailById = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(PostServices.getPostDetailById(req.params.postId), res, next);
};

const updatePostById = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(PostServices.updatePostById(req.params.postId, req.body, req.user), res, next);
};

const deletePostById = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(PostServices.deletePostById(req.params.postId), res, next);
};

const getPostByAuthor = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(PostServices.getPostsByAuthor(req.params.authorId, req.query.limit as string, req.query.page as string), res, next);
};

export const PostController = {
    createPost,
    getPosts,
    getPostDetailById,
    updatePostById,
    deletePostById,
    getPostByAuthor,
};
