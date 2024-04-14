import { Router } from 'express';
import * as purchaseOrder from '../../controller/purchaseOrder.controller';

const router = Router();

router.post('/', purchaseOrder.createPurchaseOrder);
router.post('/search', purchaseOrder.searchPurchaseOrder);
router.get('/:id', purchaseOrder.getByPurchaseOrderId);
router.put('/:id', purchaseOrder.updatePurchaseOrder);
router.post('/report/:id', purchaseOrder.reportPurchaseOrder);



export default router;
