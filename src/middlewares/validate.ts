import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';
import { UserServices } from '../services/user.service';

const callback =
    (req: Request, resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => async (err, user: UserInterface, info: Error) => {
        if (err || info || !user) {
            return reject(new ApiError(401, 'Unauthorized'));
        }
        req.user = user;
        resolve();
    };

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, callback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

export const roleValidation = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const reqUser = req.user as UserInterface;
            const user = await UserServices.getUserByEmail(reqUser.email);

            if (!user) {
                return reject(new ApiError(404, 'User not found'));
            }
            if (user.role !== role) {
                return reject(new ApiError(403, 'Access denied'));
            }
            resolve();
        } catch (error) {
            return reject(new ApiError(500, 'Internal Server Error'));
        }
    })
        .then(() => next())
        .catch((error) => next(error));
};
