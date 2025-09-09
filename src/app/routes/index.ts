import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { PurchaseRoutes } from '../modules/purchase/purchase.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/purchase',
    route: PurchaseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
