import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../utils/validateRequest';
import { AuthValidation } from './auth.validation';
import { UserControllers } from '../user/user.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/create-admin', AuthControllers.createAdmin);
router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
router.post('/logout', AuthControllers.logout);

router.get(
  '/my-profile',
  AuthGuard(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.myProfileData,
);
router.patch(
  '/change-password',
  AuthGuard(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.changePassword,
);

export const AuthRoutes = router;
