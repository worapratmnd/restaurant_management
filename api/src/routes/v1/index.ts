
import tableRouter from './table.route';
import recipeRouter from './recipe.route';
import orderItemRouter from './orderItem.route';
import orderRouter from './order.route';
import express from 'express';

const router = express.Router();

router.use("/table", tableRouter);
router.use("/recipe", recipeRouter);
router.use("/orderItem", orderItemRouter);
router.use("/order", orderRouter);

export default router;