import { Op } from "sequelize";
import { Recipe } from "../database/model/recipe.db";
import logger from "../middleware/logger";
import { CreateRecipeRequest, RecipeRequest } from "../model/recipe.request";
import To from "../utils/to.util";


const searchRecipe = async (criteria: RecipeRequest) => {
    try {
        const where: any = {};
        if (criteria.id) {
            where.id = criteria.id;
        }
        if (criteria.status) {
            where.status = criteria.status;
        }
        if (criteria.name) {
            where.name = {
                [Op.like]: `%${criteria.name}%`,
            };
        }
        if (criteria.amount) {
            where.amount = {
                [Op.eq]: criteria.amount,
            }
        }


        const [error, result] = await To(
            Recipe.findAndCountAll({
                where,
                limit: criteria.limit,
                offset: criteria.page * criteria.limit - criteria.limit,
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
        const [error, tabletResult] = await To(Recipe.findByPk(id));
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
        const [error, tableResult] = await To(Recipe.findAll());
        if (error) {
            throw error;
        }
        return tableResult;
    } catch (e) {
        logger.error(e);
    }
}

const createRecipe = async (recipe: CreateRecipeRequest) => {
    try {
        logger.info('Recipe', recipe);
        const [error, tableResult] = await To(Recipe.create({ ...recipe }));
        if (error) {
            throw error;
        }
        const result = { ...tableResult?.get(), id: tableResult?.id };
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

const updateRecipe = async (id: number, recipe: CreateRecipeRequest) => {
    try {
        logger.info('Recipe', recipe);
        const [error, recipeResult] = await To(Recipe.update({ ...recipe }, { where: { id } }));
        if (error) {
            throw error;
        }
        return recipeResult;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

const removeRecipe = async (id: number) => {
    try {
        logger.info('remove Recipe id : ', id);
        let result = await To(Recipe.destroy({
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
    searchRecipe,
    findById,
    findAll,
    createRecipe,
    updateRecipe,
    removeRecipe,
};
