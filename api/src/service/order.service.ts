import logger from "../middleware/logger";
import To from "../utils/to.util";
import { CreateOrderRequest, OrderRequest } from "../model/order.request";
import { Order } from "../database/model/order.db";
import { OrderItem } from "../database/model/orderItem.db";
import { sequelize } from "../database/config";
import { Table } from "../database/model/table.db";


const searchOrder = async (criteria: OrderRequest) => {
    try {
        const where: any = {};
        if (criteria.id) {
            where.id = criteria.id;
        }
        if (criteria.status) {
            where.status = criteria.status;
        }
        if (criteria.tableId) {
            where.tableId = criteria.tableId;
        }

        const [error, result] = await To(
            Order.findAndCountAll({
                where,
                limit: criteria.limit,
                offset: criteria.page * criteria.limit - criteria.limit,
                include: [OrderItem, Table],
            })
        );
        if (error) {
            throw error;
        }
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const findById = async (id: number) => {
    try {
        const [error, tabletResult] = await To(Order.findByPk(id, { include: [OrderItem, Table] }));
        if (error) {
            throw error;
        }
        return tabletResult;
    } catch (e) {
        logger.error(e);
    }
};

const findAll = async () => {
    try {
        const [error, tableResult] = await To(Order.findAll({ include: [OrderItem, Table] }));
        if (error) {
            throw error;
        }
        return tableResult;
    } catch (e) {
        logger.error(e);
    }
}

const createOrder = async (order: CreateOrderRequest) => {
    const transaction = await sequelize.transaction();
    try {
        logger.info('Order', order);
        const [error, orderResult] = await To(Order.create({ ...order }, { transaction }));
        if (error) {
            throw error;
        }
        orderResult!.dataValues.id = orderResult?.id;
        const orderId = orderResult?.id;

        const orderItems = order.orderItem.map((item) => {
            return {
                ...item,
                orderId,
            };
        });

        const [errorOrderItem, orderItemResult] = await To(OrderItem.bulkCreate(orderItems, { transaction }));
        if (errorOrderItem) {
            throw errorOrderItem;
        }
        const result = { ...orderResult?.get(), id: orderResult?.id };
        await transaction.commit();
        return result;
    } catch (e) {
        await transaction.rollback();
        logger.error(e);
        throw e;
    }
}

const updateOrder = async (id: number, order: CreateOrderRequest) => {
    const transaction = await sequelize.transaction();
    try {
        logger.info('Order update', order);
        const [error, orderResult] = await To(Order.update({ ...order }, { where: { id } }));
        if (error) {
            throw error;
        }
        await To(OrderItem.destroy({ where: { orderId: id }, transaction }));
        const orderItems = order?.orderItem?.map((item) => {
            return {
                ...item,
                orderId: id,
            };
        });
        await To(OrderItem.bulkCreate(orderItems, { transaction }));
        await transaction.commit();
        return orderResult;
    } catch (e) {
        await transaction.rollback();
        logger.error(e);
        throw e;
    }
}

const removeOrder = async (id: number) => {
    try {
        logger.info('remove order id : ', id);
        let result = await To(Order.destroy({
            where: {
                id: id,
            }
        }))
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}



export default {
    searchOrder,
    findById,
    findAll,
    createOrder,
    updateOrder,
    removeOrder,
};
