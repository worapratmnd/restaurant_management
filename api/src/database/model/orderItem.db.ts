import { DataTypes, Model, Sequelize } from "sequelize";
import { Recipe } from "./recipe.db";


export class OrderItem extends Model {
    declare id: number;
    declare recipeId: number;
    declare orderId: number;
    declare quantity: number;
    declare amount: number;
    declare totalAmount: string;
    declare readonly createdAt: Date;
    declare readonly createdBy: string;
    declare readonly updatedAt: Date;
    declare readonly updatedBy: string;
}

export function initOrderItem(sequelize: Sequelize): void {
    OrderItem.init(
        {
            id: {
                field: "id",
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            recipeId: {
                field: "recipe_id",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderId: {
                field: "order_id",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                field: "quantity",
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            amount: {
                field: "amount",
                type: DataTypes.DECIMAL,
                defaultValue: 0,
                allowNull: false,
            },
            totalAmount: {
                field: "total_amount",
                type: DataTypes.DECIMAL,
                defaultValue: 0,
                allowNull: false,
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
            tableName: "order_item",
        }
    );
    OrderItem.hasOne(Recipe, { foreignKey: 'id', sourceKey: 'recipeId' });
}
