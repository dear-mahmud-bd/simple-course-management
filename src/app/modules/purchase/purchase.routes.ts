import express from 'express';
import { PurchaseController } from './purchase.controller';
import validateRequest from '../../utils/validateRequest';
import { PurchaseValidation } from './purchase.validation';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/buy',
  validateRequest(PurchaseValidation.createPurchaseValidationSchema),
  AuthGuard(USER_ROLE.user),
  PurchaseController.purchaseCourse,
);
router.get('/my', AuthGuard(USER_ROLE.user), PurchaseController.getMyPurchases);
router.get(
  '/all-purchase',
  AuthGuard(USER_ROLE.admin),
  PurchaseController.getAllPurchasesCourse,
);

export const PurchaseRoutes = router;
