
import tableRouter from './table.route';
import recipeRouter from './recipe.route';
import orderItemRouter from './orderItem.route';
import orderRouter from './order.route';
import userRouter from './user.route';
import express from 'express';

const router = express.Router();

router.use("/table", tableRouter);
router.use("/recipe", recipeRouter);
router.use("/orderItem", orderItemRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

export default router;