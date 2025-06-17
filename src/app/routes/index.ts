import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
const router = express.Router();

// router.use('/auth', UserRoutes);

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
