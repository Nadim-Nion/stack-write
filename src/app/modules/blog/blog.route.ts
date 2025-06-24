import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/blogs',
  auth(UserRole.user),
  ValidateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/blogs/:id',
  auth(UserRole.user),
  ValidateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/blogs/:id', auth(UserRole.user), BlogControllers.deleteBlog);

export const BlogRoutes = router;
