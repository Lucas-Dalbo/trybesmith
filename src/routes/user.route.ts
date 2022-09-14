import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';

const router = Router();

const controller = new UserController();
const middleware = new UserMiddleware();

router.post('/users', middleware.validateUser, controller.create);
router.post('/login', middleware.validateLogin, controller.login);

export default router;
