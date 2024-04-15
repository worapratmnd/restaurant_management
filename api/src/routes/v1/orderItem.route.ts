import { Router } from 'express';
import * as orderItemController from '../../controller/orderItem.controller';

const router = Router();


router.get('/:id', orderItemController.getOrderItemById);

export default router;
