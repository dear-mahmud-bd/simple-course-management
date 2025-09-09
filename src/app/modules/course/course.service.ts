import AppError from '../../errors/AppError';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import httpStatus from 'http-status';

const createCourseToDB = async (courseData: ICourse) => {
  if (await Course.isTitleExist(courseData.title)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'A course with this title already exists.',
    );
  }
  const course = await Course.create(courseData);
  return course;
};

const deleteCourseFromDB = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course || course.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  // use this because there is possible to inconsistency in database if we delete permanently
  course.isDeleted = true;
  await course.save();
  return course;
};

const getAllCoursesFromDB = async () => {
  const courses = await Course.find({ isDeleted: false });
  return courses;
};

const getASingleCourseFromDB = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course || course.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  return course;
};

export const CourseServices = {
  createCourseToDB,
  deleteCourseFromDB,
  getAllCoursesFromDB,
  getASingleCourseFromDB,
};
