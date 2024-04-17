// import To from "../utils/to.util";

import { Op } from "sequelize";
import { User } from "../database/model/user.db";
import logger from "../middleware/logger";
import To from "../utils/to.util";
import { CreateUserRequest, UserRequest } from "../model/user.request";
import bcrypt from 'bcrypt';

const searchUser = async (criteria: UserRequest) => {
    try {
        const where: any = {};
        if (criteria.id) {
            where.id = criteria.id;
        }
        if (criteria.username) {
            where.username = criteria.username;
        }

        if (criteria.name) {
            where.name = {
                [Op.like]: `%${criteria.name}%`,
            };
        }


        const [error, result] = await To(
            User.findAndCountAll({
                where,
                attributes: { exclude: ['password'] },
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
        const [error, userResult] = await To(User.findByPk(id, { attributes: { exclude: ['password'] }, }));
        if (error) {
            throw error;
        }
        return userResult;
    } catch (e) {
        logger.error(e);
    }
};

const findAll = async () => {
    try {
        const [error, userResult] = await To(User.findAll({ attributes: { exclude: ['password'] }, }));
        if (error) {
            throw error;
        }
        return userResult;
    } catch (e) {
        logger.error(e);
    }
}

const createUser = async (userRequest: CreateUserRequest) => {
    try {
        if (userRequest.password == null || userRequest.password?.length <= 0) {
            throw new Error("password incorrect..");
        }
        userRequest.password = await bcrypt.hash(userRequest.password!, 10);
        const [error, userResult] = await To(User.create({ ...userRequest }));
        if (error) {
            throw error;
        }
        const result = { ...userResult?.get(), id: userResult?.id };
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

const updateUser = async (id: number, userRequest: CreateUserRequest) => {
    try {
        if (userRequest.password == null || userRequest.password?.length <= 0) {
            throw new Error("password incorrect..");
        }
        userRequest.password = await bcrypt.hash(userRequest.password!, 10);
        const [error, userResult] = await To(User.update({ ...userRequest }, { where: { id } }));
        if (error) {
            throw error;
        }
        return userResult;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

const removeUser = async (id: number) => {
    try {
        let result = await To(User.destroy({
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
    searchUser,
    findById,
    findAll,
    createUser,
    updateUser,
    removeUser,
};
