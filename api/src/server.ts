import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import compressFilter from './utils/compressFilter.util';
import apiV1 from './routes/v1';
import { errorHandler } from './middleware/errorHandler';
import config from './config/config';
// import authLimiter from './middleware/authLimiter';
import { xssMiddleware } from './middleware/xssMiddleware';

import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger';
import { initDatabase, sequelize } from './database/config';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(xssMiddleware());

app.use(cookieParser());

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(cors({ origin: '*' }));
// app.use(
//     cors({
//         // origin is given a array if we want to have multiple origins later
//         origin: String(config.cors.cors_origin).split('|'),
//         credentials: true
//     })
// );

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.use('/api/v1', apiV1);
// app.use(errorHandler);


const server = app.listen(port, () => {
    logger.log('info', `Server is running on Port: ${config.server.port}`);
    sequelize.sync();
    // sequelize.sync({ alter: true });
    initDatabase();
});


export { server };
