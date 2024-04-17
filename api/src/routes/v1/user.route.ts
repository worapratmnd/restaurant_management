import { Router } from 'express';
import * as userController from '../../controller/user.controller';

const router = Router();

router.post('/', userController.createUser);
router.get('/all', userController.findAll);
router.post('/search', userController.getUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

export default router;
