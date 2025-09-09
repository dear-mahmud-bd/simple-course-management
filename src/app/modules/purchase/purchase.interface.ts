import { Types } from 'mongoose';

export interface IPurchase {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  amount: number;
  date: Date;
}
