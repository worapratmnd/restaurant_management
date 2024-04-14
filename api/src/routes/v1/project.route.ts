import { Router } from 'express';
import * as projectController from '../../controller/project.controller';

const router = Router();

router.post('/', projectController.createProject);
router.get('/all', projectController.findAll);
router.post('/search', projectController.getProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);

export default router;
