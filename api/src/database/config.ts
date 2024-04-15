import { Sequelize } from 'sequelize';
import config from '../config/config';
import { initTable } from './model/table.db';
import { initRecipe } from './model/recipe.db';
import { initOrderItem } from './model/orderItem.db';

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
  initRecipe(sequelize);
  initOrderItem(sequelize);

}



export { sequelize, initDatabase };
