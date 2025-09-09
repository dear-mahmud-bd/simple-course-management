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
router.put(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  AuthGuard(USER_ROLE.admin),
  CourseControllers.updateCourse,
);
router.delete(
  '/:id',
  AuthGuard(USER_ROLE.admin),
  CourseControllers.deleteCourse,
);
router.get(
  '/',
  AuthGuard(USER_ROLE.admin, USER_ROLE.user),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  AuthGuard(USER_ROLE.admin, USER_ROLE.user),
  CourseControllers.getASingleCourse,
);

export const CourseRoutes = router;
