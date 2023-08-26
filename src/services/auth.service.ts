import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { LoginInterface } from '../interfaces/login.interface';
import { UserInterface } from '../interfaces/user.interface';
import ApiError from '../utils/apiError';
import { hashPassword, validatePassword } from '../utils/utils';
import { UserServices } from './user.service';
import getUnixTime from 'date-fns/getUnixTime';
import UserModel from '../models/user.model';

config();

/**
 * Generate token
 * @param {UserInterface} User
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (user: UserInterface, secret: string = process.env.JWT_SECRET): string => {
    const currentTime = new Date();
    const payload = {
        email: user.email,
        iat: getUnixTime(currentTime),
        exp: getUnixTime(currentTime.setDate(currentTime.getDate() + parseInt(process.env.JWT_EXPIRE))),
    };
    return jwt.sign(payload, secret);
};

/**
 * User login
 * @param {LoginInterface} user
 */
const Login = async (user: LoginInterface) => {
    const isUser = await UserServices.getUserByEmail(user.email);

    if (isUser && (await validatePassword(user.password, isUser.password))) {
        const token = generateToken(isUser);
        return { email: isUser.email, token: token };
    } else throw new ApiError(400, 'Email or password is incorrect');
};

/**
 * User Register
 * @param {LoginInterface} user
 * @returns {Promise<UserInterface>}
 */
const Register = async (user: UserInterface): Promise<UserInterface> => {
    const existUser = await UserServices.getUserByEmail(user.email);
    if (!existUser) {
        user = {
            ...user,
            password: await hashPassword(user.password),
            createdBy: 'default',
            updatedBy: 'default',
        };
        return await UserModel.create(user);
    } else throw new ApiError(400, 'Email already exist');
};

export const AuthService = {
    Login,
    Register,
    generateToken,
};
