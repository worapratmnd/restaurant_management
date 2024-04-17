import type { Response } from "express";
import logger from "../middleware/logger";
import { LoginModel } from "../model/auth.request";
import { TypedRequest } from "../types/types";
import { responseSuccess } from "../utils/return.util";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const login = async (req: TypedRequest<LoginModel>, res: Response) => {
  logger.info("getTable", req.body);
  const body = req.body as LoginModel;
  const token = jwt.sign({ foo: "bar" }, config.auth.secret, {
    expiresIn: "15m",
  });
  return responseSuccess(res, "success", token);
};
