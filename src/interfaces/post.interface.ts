import { ObjectId } from 'mongoose';
import { DefaultInterface } from './default.interface';

export interface PostInterface extends DefaultInterface {
    title: string;
    status: string;
    content: string;
    category: ObjectId;
    author: ObjectId;
}
