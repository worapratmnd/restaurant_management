import logger from './src/middleware/logger';
import { server } from './src/server';

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received.');
    logger.info('Closing server.');
    server.close((err) => {
        logger.info('Server closed.');
        // eslint-disable-next-line no-process-exit
        process.exit(err ? 1 : 0);
    });
});
