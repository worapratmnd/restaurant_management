import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import To from '../utils/to.util';
import logger from '../middleware/logger';
import { responseCreatedSuccess, responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';
import userService from '../service/user.service';
import { CreateUserRequest, UserRequest } from '../model/user.request';


export const findAll = async (
    req: TypedRequest<UserRequest>,
    res: Response
) => {
    const [error, result] = await To(userService.findAll());
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const getUser = async (
    req: TypedRequest<UserRequest>,
    res: Response
) => {
    const criteria: UserRequest = req.body as UserRequest;
    criteria.page = req.body?.page ?? 1;
    criteria.limit = req.body?.limit ?? 20;
    criteria.sort = req.body?.sort ?? 'id';
    criteria.order = req.body?.order ?? 'DESC';

    const [error, result] = await To(userService.searchUser(criteria));
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

export const getUserById = async (
    req: TypedRequest<UserRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [error, result] = await To(userService.findById(id));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (result == null) {
        return responseDataNotFound(res);
    }
    return responseSuccess(res, null, result);
};

export const createUser = async (
    req: TypedRequest<CreateUserRequest>,
    res: Response
) => {
    const body = req.body as CreateUserRequest;
    const [error, result] = await To(userService.createUser(body));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseCreatedSuccess(res, null, result);
};



export const updateUser = async (
    req: TypedRequest<CreateUserRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const user = req.body as CreateUserRequest;
    const [_, founded] = await To(userService.findById(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    const [error, result] = await To(userService.updateUser(id, user));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const removeUser = async (
    req: TypedRequest<CreateUserRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [_, founded] = await To(userService.removeUser(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    return responseSuccess(res, null, founded);
}