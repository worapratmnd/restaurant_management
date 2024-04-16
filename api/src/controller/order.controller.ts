import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import To from '../utils/to.util';
// import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import logger from '../middleware/logger';
import { responseCreatedSuccess, responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';
import orderService from '../service/order.service';
import { CreateOrderRequest, OrderRequest } from '../model/order.request';


export const findAll = async (
    req: TypedRequest<OrderRequest>,
    res: Response
) => {
    const [error, result] = await To(orderService.findAll());
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const getOrder = async (
    req: TypedRequest<OrderRequest>,
    res: Response
) => {
    logger.info('getTable', req.body);
    const criteria = req.body as OrderRequest;
    criteria.page = req.body?.page ?? 1;
    criteria.limit = req.body?.limit ?? 20;
    criteria.sort = req.body?.sort ?? 'id';
    criteria.order = req.body?.order ?? 'DESC';

    const [error, result] = await To(orderService.searchOrder(criteria));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    logger.info('result', result);
    return res.status(200).json({
        code: 200,
        message: 'Success',
        data: result?.rows,
        total: result?.count,
        page: criteria.page,
        limit: criteria.limit
    });
    // return responsePaggingSuccess(res, null, result?.rows, result?.count ?? 0, criteria.page, criteria.limit);
};

export const getOrderById = async (
    req: TypedRequest<OrderRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [error, result] = await To(orderService.findById(id));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (result == null) {
        return responseDataNotFound(res);
    }
    return responseSuccess(res, null, result);
};

export const createOrder = async (
    req: TypedRequest<CreateOrderRequest>,
    res: Response
) => {
    const order = req.body as CreateOrderRequest;
    const [error, result] = await To(orderService.createOrder(order));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseCreatedSuccess(res, null, result);
};



export const updateOrder = async (
    req: TypedRequest<CreateOrderRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const order = req.body as CreateOrderRequest;
    const [_, founded] = await To(orderService.findById(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    const [error, result] = await To(orderService.updateOrder(id, order));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const removeOrder = async (
    req: TypedRequest<CreateOrderRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [_, founded] = await To(orderService.removeOrder(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    return responseSuccess(res, null, founded);
}