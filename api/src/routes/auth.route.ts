import { NextFunction, Router, Response } from "express";
import * as authController from "../controller/auth.controller";
import config from "../config/config";
import jwt from "jsonwebtoken";
import logger from "../middleware/logger";

const router = Router();

router.post("/login", authController.login);

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
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
        const username = decoded?.username ?? '';
        req.user = username;
        req.body = {
            ...req.body,
            createdBy: username,
            updatedBy: username,
        }
        next();
    });
};

export default router;
