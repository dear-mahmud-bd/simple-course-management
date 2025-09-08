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

export const CourseControllers = {
  createCourse,
  deleteCourse,
};
