import { DataTypes, Model, Sequelize } from "sequelize";


export class Table extends Model {
    declare id: number;
    declare name: string;
    declare status: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

export function initTable(sequelize: Sequelize): void {
    Table.init(
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
            tableName: "table_management",
        }
    );
}
