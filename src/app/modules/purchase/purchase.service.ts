import AppError from '../../errors/AppError';
import { Course } from '../course/course.model';
import httpStatus from 'http-status';
import { Purchase } from './purchase.model';

const purchaseACourse = async (
  userId: string,
  courseId: string,
  amount: number,
) => {
  const course = await Course.findById(courseId);
  if (!course || course.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  if (course.price > amount) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Incorrect amount for the course',
    );
  }
  const alreadyPurchased = await Purchase.findOne({ userId, courseId });
  if (alreadyPurchased) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course already purchased');
  }
  const purchase = await Purchase.create({
    userId,
    courseId,
    amount: course.price,
  });
  return purchase;
};

const myPurchasesCourse = async (userId: string) => {
  const purchases = await Purchase.find({ userId }).populate('courseId');
  return purchases;
};

const getAllPurchasesCourse = async () => {
  const purchases = await Purchase.find().populate('courseId').populate({
    path: 'userId',
    select: 'name email',
  });
  return purchases;
};

export const PurchaseServices = {
  purchaseACourse,
  myPurchasesCourse,
  getAllPurchasesCourse,
};
