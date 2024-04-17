import { User } from "../database/model/user.db";
import logger from "../middleware/logger";
import { LoginModel } from "../model/auth.request";
import To from "../utils/to.util";
import bcrypt from 'bcrypt';


const login = async (loginBody: LoginModel) => {
    try {
        if (!loginBody.username || loginBody.username.length <= 0) {
            return null;
        }
        const [error, userResult] = await To(User.findOne({
            where: {
                username: loginBody.username,
            }
        }));

        if (error) {
            throw error;
        }

        const password = userResult?.password ?? "";
        const passwordMatch = await bcrypt.compare(loginBody?.password, password);
        if (passwordMatch) {
            return userResult;
        }
        return null;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}



export default {
    login,
}