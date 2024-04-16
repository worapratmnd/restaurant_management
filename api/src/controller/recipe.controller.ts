import type { Response } from 'express';
import type { TypedRequest } from '../types/types';
import To from '../utils/to.util';
// import type { CreateProjectRequest, ProjectRequest } from '../model/project.request';
import logger from '../middleware/logger';
import { responseCreatedSuccess, responseDataNotFound, responsePaggingSuccess, responseSuccess } from '../utils/return.util';
import recipeService from '../service/recipe.service';
import { RecipeRequest, CreateRecipeRequest } from '../model/recipe.request'


export const findAll = async (
    req: TypedRequest<RecipeRequest>,
    res: Response
) => {
    const [error, result] = await To(recipeService.findAll());
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const getRecipe = async (
    req: TypedRequest<RecipeRequest>,
    res: Response
) => {
    logger.info('getRecipe', req.body);
    const criteria: RecipeRequest = req.body as RecipeRequest;
    criteria.page = req.body?.page ?? 1;
    criteria.limit = req.body?.limit ?? 20;
    criteria.sort = req.body?.sort ?? 'id';
    criteria.order = req.body?.order ?? 'DESC';

    const [error, result] = await To(recipeService.searchRecipe(criteria));
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
    req: TypedRequest<RecipeRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [error, result] = await To(recipeService.findById(id));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    if (result == null) {
        return responseDataNotFound(res);
    }
    return responseSuccess(res, null, result);
};

export const createRecipe = async (
    req: TypedRequest<CreateRecipeRequest>,
    res: Response
) => {
    const recipe = req.body as CreateRecipeRequest;
    const [error, result] = await To(recipeService.createRecipe(recipe));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseCreatedSuccess(res, null, result);
};



export const updateRecipe = async (
    req: TypedRequest<CreateRecipeRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const recipe = req.body as CreateRecipeRequest;
    const [_, founded] = await To(recipeService.findById(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    const [error, result] = await To(recipeService.updateRecipe(id, recipe));
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return responseSuccess(res, null, result);
}

export const removeRecipe = async (
    req: TypedRequest<CreateRecipeRequest>,
    res: Response
) => {
    const id: number = req.params['id'] as number;
    const [_, founded] = await To(recipeService.removeRecipe(id));
    if (founded == null) {
        return res.status(404).json({ code: 404, message: 'Not found', data: null });
    }
    return responseSuccess(res, null, founded);
}