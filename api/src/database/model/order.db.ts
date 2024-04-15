import { DataTypes, Model, Sequelize } from "sequelize";
import { OrderItem } from "./orderItem.db";
import { Table } from "./table.db";


export class Order extends Model {
    declare id: number;
    declare tableId: number;
    declare totalAmount: string;
    declare status: string;
    declare readonly createdAt: Date;
    declare readonly createdBy: string;
    declare readonly updatedAt: Date;
    declare readonly updatedBy: string;
}

export function initOrder(sequelize: Sequelize): void {
    Order.init(
        {
            id: {
                field: "id",
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tableId: {
                field: "table_id",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalAmount: {
                field: "total_amount",
                type: DataTypes.DECIMAL,
                defaultValue: 0,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'A',
            },
            createdBy: {
                type: DataTypes.STRING,
            },
            updatedBy: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: "order",
        }
    );
    Order.hasOne(Table, { foreignKey: 'id', sourceKey: 'tableId' });
    Order.hasMany(OrderItem, { foreignKey: 'order_id', sourceKey: 'id' });
}
