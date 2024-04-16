import { IManageTable } from "./manage-table.interface";

export interface IOrder {
    id?: number;
    tableId?: number;
    totalAmount?: string;
    status?: string;
    Table: IManageTable,
    OrderItems: IOrderItem[];
}

export interface IOrderItem {
    id?: number;
    recipeId?: number,
    orderId?: number,
    quantity?: number,
    amount?: string,
    totalAmount?: string,
}

export interface ICreateOrder {
    tableId?: number;
    totalAmount?: string;
    status?: string;
    orderItems: ICreateOrderItem[];
}

export interface ICreateOrderItem {
    recipeId?: number,
    quantity?: number,
    amount?: string,
    totalAmount?: string,
}