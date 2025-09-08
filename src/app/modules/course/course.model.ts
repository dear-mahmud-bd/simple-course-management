import { model, Schema } from 'mongoose';
import { CourseModel, ICourse } from './course.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const CourseSchema = new Schema<ICourse, CourseModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// middlewire
// static method
CourseSchema.statics.isTitleExist = async function (title) {
  return await this.findOne({ title });
};

export const Course = model<ICourse, CourseModel>('Course', CourseSchema);
