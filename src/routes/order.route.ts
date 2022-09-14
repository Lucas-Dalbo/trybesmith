import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import OrderMiddleware from '../middlewares/order.middleware';
import { validateJWT } from '../auth';

const router = Router();

const controller = new OrderController();
const middleware = new OrderMiddleware();

router.get('/', controller.getAll);
router.post('/', validateJWT, middleware.validateOrder, controller.create);

export default router;