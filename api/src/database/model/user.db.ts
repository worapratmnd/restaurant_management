import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    declare id: number;
    declare username: string;
    declare name: string;
    declare password: string;
    declare readonly createdAt: Date;
    declare readonly createdBy: string;
    declare readonly updatedAt: Date;
    declare readonly updatedBy: string;
}

export function initUser(sequelize: Sequelize): void {
    User.init(
        {
            id: {
                field: "id",
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                field: "username",
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            name: {
                field: "name",
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                field: "password",
                type: DataTypes.STRING(255),
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
            tableName: "users",
        }
    );
}
