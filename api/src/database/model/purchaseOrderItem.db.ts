import { DataTypes, Model, Sequelize } from 'sequelize';
export class PurchaseOrderItem extends Model {
    public id!: number;
    public amount!: string | null;
    public description!: string | null;
    public discount!: string | null;
    public partNumber!: string | null;
    public purchaseOrderId!: number | null;
    public qty!: string | null;
    public unitPrice!: string | null;
    // public purchaseOrderItem!: PurchaseOrderItem[] | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initPurchaseOrderItem(sequelize: Sequelize) {
    PurchaseOrderItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            amount: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            discount: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            partNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            purchaseOrderId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'purchase_order',
                    key: 'id',
                },
            },
            qty: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            unitPrice: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'purchase_order_item',
        }
    );

    return PurchaseOrderItem;
}
