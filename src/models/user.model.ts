import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import defaultFields from './default.model';
import { APP_USER_ROLES } from '../config/userRole';

const UserSchema = new mongoose.Schema<UserInterface>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(APP_USER_ROLES),
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
