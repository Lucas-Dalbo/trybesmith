import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

const controller = new OrderController();

router.get('/', controller.getAll);

export default router;