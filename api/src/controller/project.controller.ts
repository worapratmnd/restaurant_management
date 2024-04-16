import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import projectService from '../service/project.service';
import To from '../utils/to.util';
import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import logger from '../middleware/logger';
import { responseCreatedSuccess, responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';


export const findAll = async (
  req: TypedRequest<ProjectRequest>,
  res: Response
) => {
  const [error, result] = await To(projectService.findAll());
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseSuccess(res, null, result);
}

export const getProject = async (
  req: TypedRequest<ProjectRequest>,
  res: Response
) => {
  logger.info('getProject', req.body);
  const criteria: ProjectRequest = req.body as ProjectRequest;
  criteria.page = req.body?.page ?? 1;
  criteria.limit = req.body?.limit ?? 20;
  criteria.sort = req.body?.sort ?? 'id';
  criteria.order = req.body?.order ?? 'DESC';

  const [error, result] = await To(projectService.searchProject(criteria));
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

export const getProjectById = async (
  req: TypedRequest<ProjectRequest>,
  res: Response
) => {
  const id: number = req.params['id'] as number;
  const [error, result] = await To(projectService.findById(id));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  if (result == null) {
    return responseDataNotFound(res);
  }
  return responseSuccess(res, null, result);
};

export const createProject = async (
  req: TypedRequest<CreateProjectRequest>,
  res: Response
) => {
  const project = req.body as CreateProjectRequest;
  const [error, result] = await To(projectService.createProject(project));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseCreatedSuccess(res, null, result);
};



export const updateProject = async (
  req: TypedRequest<CreateProjectRequest>,
  res: Response
) => {
  const id: number = req.params['id'] as number;
  const project = req.body as CreateProjectRequest;
  const [_, founded] = await To(projectService.findById(id));
  if (founded == null) {
    return res.status(404).json({ code: 404, message: 'Not found', data: null });
  }
  const [error, result] = await To(projectService.updateProject(id, project));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return responseSuccess(res, null, result);

}