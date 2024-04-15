import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import To from '../utils/to.util';
// import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import logger from '../middleware/logger';
import { responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';
import orderItemService from '../service/orderItem.service';



export const getOrderItemById = async (
    req: TypedRequest,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [error, result] = await To(orderItemService.findById(id));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (result == null) {
        return responseDataNotFound(res);
    }
    return responseSuccess(res, null, result);
};
