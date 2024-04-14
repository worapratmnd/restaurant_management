import type { Response } from 'express';

export function responseSuccess(res: Response, message: string | null = 'Success', data: any = null) {
    const statusCode: number = 200;
    return res.status(statusCode).json({ code: statusCode, message: message ?? 'Success', data: data });
}

export function responsePaggingSuccess(res: Response, message: string | null, data: any = null, total: number, page: number, limit: number) {
    const statusCode: number = 200;
    return res.status(statusCode).json({
        code: statusCode,
        message: message ?? 'Success',
        data,
        total,
        page,
        limit
    });
}

export function responseDataNotFound(res: Response, message: string = 'Data not found', data: any = null) {
    const statusCode: number = 404;
    return res.status(statusCode).json({ code: statusCode, message: message ?? 'Data not found', data: data });
}

export function responseCommonError(res: Response, message: string | null, data: any = null) {
    const statusCode: number = 400;
    return res.status(statusCode).json({ code: statusCode, message: message ?? 'Error', data: data });
}

export function responseServerException(res: Response, message: string | null, data: any = null) {
    const statusCode: number = 500;
    return res.status(statusCode).json({ code: statusCode, message: message ?? 'Server Exception', data: data });
}