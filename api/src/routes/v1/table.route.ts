import { Router } from 'express';
import * as tableController from '../../controller/table.controller';

const router = Router();

router.post('/', tableController.createTable);
router.get('/all', tableController.findAll);
router.post('/search', tableController.getTable);
router.get('/:id', tableController.getTableById);
router.put('/:id', tableController.updateTable);
router.delete('/:id', tableController.removeTable);

export default router;
