import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserServices } from '../services/user.service';

const callback = (req, resolve, reject) => async (err, user: UserInterface, info: Error) => {
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
