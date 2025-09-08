import { Model } from 'mongoose';

export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseModel extends Model<ICourse> {
  isTitleExist(title: string): Promise<ICourse>;
}
