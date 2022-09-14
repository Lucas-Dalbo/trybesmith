import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ProductMiddleware from '../middlewares/product.middleware';

const router = Router();

const controller = new ProductController();
const middleware = new ProductMiddleware();

router.post('/', middleware.productValidation, controller.create);
router.get('/', controller.getAll);

export default router;