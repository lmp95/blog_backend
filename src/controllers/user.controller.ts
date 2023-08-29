import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user.service';
import { controllerHandler } from '../utils/utils';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(UserServices.getUsers(), res, next);
};

export const UserController = {
    getUsers,
};
