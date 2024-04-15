// import To from "../utils/to.util";

import { Op } from "sequelize";
import logger from "../middleware/logger";
import To from "../utils/to.util";
import { OrderItem } from "../database/model/orderItem.db";
import { Recipe } from "../database/model/recipe.db";

// const searchTable = async (criteria: TableRequest) => {
//     try {
//         const where: any = {};
//         if (criteria.id) {
//             where.id = criteria.id;
//         }
//         if (criteria.status) {
//             where.status = criteria.status;
//         }

//         if (criteria.name) {
//             where.name = {
//                 [Op.like]: `%${criteria.name}%`,
//             };
//         }

//         const [error, result] = await To(
//             Table.findAndCountAll({
//                 where,
//                 limit: criteria.limit,
//                 offset: criteria.page * criteria.limit - criteria.limit,
//             })
//         );
//         if (error) {
//             throw error;
//         }
//         return result;
//     } catch (e) {
//         logger.error(e);
//         throw e;
//     }
// };

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

// const findAll = async () => {
//     try {
//         const [error, tableResult] = await To(Table.findAll());
//         if (error) {
//             throw error;
//         }
//         return tableResult;
//     } catch (e) {
//         logger.error(e);
//     }
// }

// const createTable = async (table: CreateTableRequest) => {
//     try {
//         logger.info('table', table);
//         const [error, tableResult] = await To(Table.create({ ...table }));
//         if (error) {
//             throw error;
//         }
//         const result = { ...tableResult?.get(), id: tableResult?.id };
//         return result;
//     } catch (e) {
//         logger.error(e);
//         throw e;
//     }
// }

// const updateTable = async (id: number, table: CreateTableRequest) => {
//     try {
//         logger.info('table', table);
//         const [error, tableResult] = await To(Table.update({ ...table }, { where: { id } }));
//         if (error) {
//             throw error;
//         }
//         return tableResult;
//     } catch (e) {
//         logger.error(e);
//         throw e;
//     }
// }

// const removeTable = async (id: number) => {
//     try {
//         logger.info('remove table id : ', id);
//         let result = await To(Table.destroy({
//             where: {
//                 id: id,
//             }
//         }))
//         return result;
//     } catch (e) {
//         logger.error(e);
//         throw e;
//     }
// }

export default {
    findById,
};
