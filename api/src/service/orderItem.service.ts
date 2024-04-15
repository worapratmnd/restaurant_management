// import To from "../utils/to.util";

import { Op } from "sequelize";
import logger from "../middleware/logger";
import To from "../utils/to.util";
import { OrderItem } from "../database/model/orderItem.db";
import { Recipe } from "../database/model/recipe.db";


const findById = async (id: number) => {
    try {
        logger.info(`OrderItem service findById: ${id}`);
        const [error, orderItemResult] = await To(
            OrderItem.findByPk(id, {
                include: Recipe,
            })
        );
        if (error) {
            throw error;
        }
        return orderItemResult;
    } catch (e) {
        console.error(e);
        logger.error(e);
    }
};


export default {
    findById,
};
