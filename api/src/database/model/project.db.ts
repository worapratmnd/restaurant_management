import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config';

export class Project extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
  public startDate!: Date;
  public endDate!: Date;
  public actualCost!: number;
  public sellPrice!: number;
  public status!: string;
  public description!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function initProject(sequelize: Sequelize): void {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE
      },
      endDate: {
        type: DataTypes.DATE
      },
      actualCost: {
        type: DataTypes.DECIMAL
      },
      sellPrice: {
        type: DataTypes.DECIMAL
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "InProgress",
      },
      description: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    {
      sequelize,
      tableName: 'project',
    }
  );
}

