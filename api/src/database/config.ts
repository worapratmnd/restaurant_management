import { Sequelize } from 'sequelize';
import config from '../config/config';
import { initPurchaseOrder } from './model/purchaseOrder.db';
import { initPurchaseOrderItem } from './model/purchaseOrderItem.db';
import { initProject } from './model/project.db';
import { initTable } from './model/table.db';

const sequelize = new Sequelize(
  config.database.DB,
  config.database.USER,
  config.database.PASSWORD,
  {
    host: config.database.HOST,
    dialect: 'mysql',
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    },
    pool: {
      max: config.database.pool.max,
      min: config.database.pool.min,
      acquire: config.database.pool.acquire,
      idle: config.database.pool.idle
    }
  }
);

function initDatabase() {
  initTable(sequelize);
  // initProject(sequelize);
  // initPurchaseOrder(sequelize);
  // initPurchaseOrderItem(sequelize);
}



export { sequelize, initDatabase };
