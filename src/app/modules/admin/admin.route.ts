import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(UserRole.admin),
  AdminController.blockUser,
);

router.delete('/blogs/:id', auth(UserRole.admin), AdminController.deleteBlog);

export const AdminRoutes = router;
