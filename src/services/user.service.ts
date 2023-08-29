import { UserInterface } from '../interfaces/user.interface';
import UserModel from '../models/user.model';

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<UserInterface>}
 */
const getUserByEmail = async (email: string): Promise<UserInterface> => {
    return await UserModel.findOne({ email: email });
};

/**
 * Get user list
 * @returns {UserInterface[]}
 */
const getUsers = async (): Promise<UserInterface[]> => {
    return await UserModel.find();
};

export const UserServices = {
    getUserByEmail,
    getUsers,
};
