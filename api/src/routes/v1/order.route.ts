import { Router } from 'express';
import * as orderController from '../../controller/order.controller';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/all', orderController.findAll);
router.post('/search', orderController.getOrder);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.removeOrder);

export default router;
