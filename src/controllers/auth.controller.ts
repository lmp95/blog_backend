import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { controllerHandler } from '../utils/utils';

const login = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(AuthService.Login(req.body), res, next);
};

const register = (req: Request, res: Response, next: NextFunction) => {
    controllerHandler(AuthService.Register(req.body), res, next);
};

export const AuthController = {
    login,
    register,
};
