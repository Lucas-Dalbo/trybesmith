import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateJWT } from '../auth';

const router = Router();

const controller = new UserController();

router.post('/', controller.create);
router.get('/', validateJWT);

export default router;
