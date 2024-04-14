import To from '../utils/to.util';

import { Project } from '../database/model/project.db';
import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import { Op } from 'sequelize';
import logger from '../middleware/logger';

const searchProject = async (criteria: ProjectRequest) => {
  try {
    const where: any = {};
    if (criteria.id) {
      where.id = criteria.id;
    }
    if (criteria.code) {
      where.code = {
        [Op.like]: `%${criteria.code}%`
      };
    }
    if (criteria.name) {
      where.name = {
        [Op.like]: `%${criteria.name}%`
      };
    }
    const [error, projectResult] = await To(
      Project.findAndCountAll({
        where,
        limit: criteria.limit,
        offset: criteria.page * criteria.limit - criteria.limit
      })
    );
    if (error) {
      throw error;
    }
    return projectResult;
  } catch (e) {
    logger.error(e);
  }
};

const findById = async (id: number) => {
  try {
    const [error, projectResult] = await To(Project.findByPk(id));
    if (error) {
      throw error;
    }
    return projectResult;
  } catch (e) {
    logger.error(e);
  }
};

const findAll = async () => {
  try {
    const [error, projectResult] = await To(Project.findAll());
    if (error) {
      throw error;
    }
    return projectResult;
  } catch (e) {
    logger.error(e);
  }
}

const createProject = async (project: CreateProjectRequest) => {
  try {
    logger.info('project', project);
    const [error, projectResult] = await To(Project.create({ ...project }));
    if (error) {
      throw error;
    }
    const result = { ...projectResult?.get(), id: projectResult?.id };
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

const updateProject = async (id: number, project: CreateProjectRequest) => {
  try {
    logger.info('project', project);
    const [error, projectResult] = await To(Project.update({ ...project }, { where: { id } }));
    if (error) {
      throw error;
    }
    return projectResult;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}


export default {
  findAll,
  searchProject,
  findById,
  createProject,
  updateProject,
};
