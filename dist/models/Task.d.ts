import mongoose, { Document, Types } from 'mongoose';
import { IUser } from './User';
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: Date;
    assignedTo: Types.ObjectId | IUser;
    createdBy: Types.ObjectId | IUser;
}
export declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
