
import tableRouter from './table.route';
import recipeRouter from './recipe.route';
import express from 'express';

const router = express.Router();


router.use("/table", tableRouter);
router.use("/recipe", recipeRouter);

export default router;