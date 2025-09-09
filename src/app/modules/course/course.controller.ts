import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const courseData = req.body;
  const result = await CourseServices.createCourseToDB(courseData);
  sendResponse(res, {
    success: true,
    message: 'Course created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id: courseId } = req.params;
  const updateData = req.body;
  const result = await CourseServices.updateCourseToDB(courseId, updateData);
  sendResponse(res, {
    success: true,
    message: 'Course updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id: courseId } = req.params;
  const result = await CourseServices.deleteCourseFromDB(courseId);
  sendResponse(res, {
    success: true,
    message: 'Course deleted successfully',
    statusCode: httpStatus.OK,
    data: null,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDB();
  sendResponse(res, {
    success: true,
    message: 'Courses retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getASingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id: courseId } = req.params;
  const result = await CourseServices.getASingleCourseFromDB(courseId);
  sendResponse(res, {
    success: true,
    message: 'Course retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getASingleCourse,
};
