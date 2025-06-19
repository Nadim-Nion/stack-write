import express from 'express';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import ValidateRequest from '../../middlewares/ValidateRequest';
const router = express.Router();

router.post(
  '/register',
  ValidateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  ValidateRequest(UserValidations.userLoginValidationSchema),
  UserControllers.userLogin,
);

export const UserRoutes = router;
