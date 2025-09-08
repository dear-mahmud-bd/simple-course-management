import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(CourseValidation.createCourseValidationSchema),
  AuthGuard(USER_ROLE.admin),
  CourseControllers.createCourse,
);

router.delete(
  '/:id',
  AuthGuard(USER_ROLE.admin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
