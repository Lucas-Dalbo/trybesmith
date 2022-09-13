import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

const controller = new ProductController();

router.post('/', controller.create); // Adicionar validação depois
router.get('/', controller.getAll);

export default router;