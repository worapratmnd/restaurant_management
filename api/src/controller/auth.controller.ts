import type { Response } from "express";
import logger from "../middleware/logger";
import { LoginModel } from "../model/auth.request";
import { TypedRequest } from "../types/types";
import { responseSuccess } from "../utils/return.util";
import jwt from "jsonwebtoken";
import config from "../config/config";
import authService from '../service/auth.service';
import To from "../utils/to.util";

export const login = async (req: TypedRequest<LoginModel>, res: Response) => {
  logger.info("login: ", req.body);
  const body = req.body as LoginModel;

  let [error, result] = await To(authService.login(body));
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!result) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorize',
      data: null,
    });
  }
  const token = jwt.sign({ username: result.username }, config.auth.secret, {
    expiresIn: "15m",
  });
  return responseSuccess(res, "success", token);
};


