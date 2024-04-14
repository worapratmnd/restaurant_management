import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  node_env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT
    // url: process.env.SERVER_URL
  },
  cors: {
    cors_origin: process.env.CORS_ORIGIN
  },
  database: {
    HOST: process.env.MYSQL_DATABASE_HOST ?? '',
    USER: process.env.MYSQL_DATABASE_USER ?? '',
    PASSWORD: process.env.MYSQL_DATABASE_PASSWORD ?? '',
    DB: process.env.MYSQL_DATABASE_NAME ?? '',
    PORT: process.env.MYSQL_DATABASE_PORT ?? '',
    DIALECT: process.env.MYSQL_DATABASE_DIALECT ?? '',
    // ssl: {
    //   rejectUnauthorized: false,
    //   ca: fs.readFileSync('./DigiCertGlobalRootCA.crt').toString(),
    // },
    dialectOptions: {
      useUTC: false,
      ssl: {
        rejectUnauthorized: false // very important
      }
    },
    timezone: '+07:00',
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
} as const;

export default config;
