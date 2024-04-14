import { DataTypes, Model, Sequelize } from 'sequelize';

export class PurchaseOrder extends Model {
  public id!: number;
  public delivery!: string | null;
  public paymentTerm!: string | null;
  public poDate!: Date | null;
  public poCode!: string | null;
  public projectId!: number | null;
  public refqno!: string | null;
  public sendDate!: Date | null;
  public shipToAddress!: string | null;
  public shipToName!: string | null;
  public validity!: string | null;
  public vendor!: string | null;
  public vendorAddress!: string | null;
  public vendorName!: string | null;
  public warranty!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initPurchaseOrder(sequelize: Sequelize): void {
  PurchaseOrder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      delivery: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      paymentTerm: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      poDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      poCode: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'project',
          key: 'id',
        },
      },
      refqno: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sendDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shipToAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      shipToName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      validity: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vendor: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vendorAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      vendorName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      warranty: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'purchase_order',
    }
  );
}
