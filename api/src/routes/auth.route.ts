import { NextFunction, Router, Response } from "express";
import * as authController from "../controller/auth.controller";
import config from "../config/config";
import jwt from "jsonwebtoken";
import logger from "../middleware/logger";

const router = Router();

router.post("/login", authController.login);

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    logger.debug("verifyToken...");
    const bearerToken: string = req.headers['authorization'];

    if (!bearerToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let splitToken = bearerToken.split(' ');
    if (splitToken.length <= 1) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = splitToken[1];
    jwt.verify(token, config.auth.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        // Attach the decoded user information to the request object for later use
        req.user = decoded;
        next();
    });
};

export default router;
