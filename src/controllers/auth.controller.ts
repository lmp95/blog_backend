import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.Login(req.body);
        res.send(result);
    } catch (error) {
        next(error);
    }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.Register(req.body);
        res.send(result);
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    login,
    register,
};
