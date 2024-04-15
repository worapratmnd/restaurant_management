import { DataTypes, Model, Sequelize } from "sequelize";


export class Recipe extends Model {
    declare id: number;
    declare name: string;
    declare amount: number;
    declare status: string;
}

export function initRecipe(sequelize: Sequelize): void {
    Recipe.init(
        {
            id: {
                field: "id",
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                field: "name",
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            amount: {
                field: "amount",
                type: DataTypes.DECIMAL,
                defaultValue: 0,
                allowNull: false,
            },
            status: {
                field: "status",
                type: DataTypes.STRING(255),
                defaultValue: 'A',
                allowNull: false,
            },

        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: "recipe",
        }
    );
}
