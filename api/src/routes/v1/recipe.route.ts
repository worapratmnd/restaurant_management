import { Router } from 'express';
import * as recipeController from '../../controller/recipe.controller';

const router = Router();

router.post('/', recipeController.createRecipe);
router.get('/all', recipeController.findAll);
router.post('/search', recipeController.getRecipe);
router.get('/:id', recipeController.getTableById);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.removeRecipe);

export default router;
