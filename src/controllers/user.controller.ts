import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user.service';
import ApiError from '../utils/apiError';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserServices.getUsers();
        res.send(users);
    } catch (error) {
        throw new ApiError(400, 'Fail to retrieve users');
    }
};

export const UserController = {
    getUsers,
};
