import config from '../config/config';
import winston, { createLogger, format, transports } from 'winston';


const customFormat = winston.format.printf(({
  timestamp,
  level,
  message,
  label = '',
  ...meta
}) => `${timestamp} [${level.toUpperCase()}] ${label} ${message} ${formatMeta(meta).length > 0 ? `\n${formatMeta(meta)}` : ''}`);
// }) => `[${timestamp}] ${level.toUpperCase()} ${label} ${message} ${formatMeta(meta)}`);

const formatMeta = (meta: any) => {
  // You can format the splat yourself
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }
  return '';
};

const logger = createLogger({
  level: config.node_env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    customFormat,
    // format.printf(({ timestamp, level, message, stack }) => {
    //   return `${timestamp} [${level.toUpperCase()}] ${message} ${stack ? `\n${stack}` : ''
    //     }`;
    // })
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error']
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});


export default logger;
