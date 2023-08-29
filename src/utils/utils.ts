import { genSalt, hash, compare } from 'bcryptjs';
import { NextFunction, Response } from 'express';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
};

export const validatePassword = async (enteredPassword: string, password: string): Promise<boolean> => {
    return await compare(enteredPassword, password);
};

export const controllerHandler = async (fn: Promise<any>, res?: Response, next?: NextFunction) => {
    try {
        const result = await fn;
        res.send(result);
    } catch (error) {
        next(error);
    }
};
