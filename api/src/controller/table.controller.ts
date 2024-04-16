import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import To from '../utils/to.util';
// import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import logger from '../middleware/logger';
import { responseCreatedSuccess, responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';
import tableService from '../service/table.service';
import { CreateTableRequest, TableRequest } from '../model/table.request';


export const findAll = async (
  req: TypedRequest<TableRequest>,
  res: Response
) => {
  const [error, result] = await To(tableService.findAll());
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseSuccess(res, null, result);
}

export const getTable = async (
  req: TypedRequest<TableRequest>,
  res: Response
) => {
  logger.info('getTable', req.body);
  const criteria: TableRequest = req.body as TableRequest;
  criteria.page = req.body?.page ?? 1;
  criteria.limit = req.body?.limit ?? 20;
  criteria.sort = req.body?.sort ?? 'id';
  criteria.order = req.body?.order ?? 'DESC';

  const [error, result] = await To(tableService.searchTable(criteria));
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

export const getTableById = async (
  req: TypedRequest<TableRequest>,
  res: Response
) => {
  const id: number = req.params['id'] as number;
  const [error, result] = await To(tableService.findById(id));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  if (result == null) {
    return responseDataNotFound(res);
  }
  return responseSuccess(res, null, result);
};

export const createTable = async (
  req: TypedRequest<CreateTableRequest>,
  res: Response
) => {
  const table = req.body as CreateTableRequest;
  const [error, result] = await To(tableService.createTable(table));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseCreatedSuccess(res, null, result);
};



export const updateTable = async (
  req: TypedRequest<CreateTableRequest>,
  res: Response
) => {
  const id: number = req.params['id'] as number;
  const table = req.body as CreateTableRequest;
  const [_, founded] = await To(tableService.findById(id));
  if (founded == null) {
    return res.status(404).json({ code: 404, message: 'Not found', data: null });
  }
  const [error, result] = await To(tableService.updateTable(id, table));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseSuccess(res, null, result);
}

export const removeTable = async (
  req: TypedRequest<CreateTableRequest>,
  res: Response
) => {
  const id: number = req.params['id'] as number;
  const [_, founded] = await To(tableService.removeTable(id));
  if (founded == null) {
    return res.status(404).json({ code: 404, message: 'Not found', data: null });
  }
  return responseSuccess(res, null, founded);
}