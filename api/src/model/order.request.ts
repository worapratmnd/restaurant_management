import { AuthUserRequest, PaginateRequest } from "./paginate.request";


export interface OrderRequest extends PaginateRequest {
    id?: number | undefined;
    tableId?: number | undefined;
    totalAmount?: number | undefined;
    status?: string | undefined;
}

export interface CreateOrderRequest extends AuthUserRequest {
    id?: number | undefined;
    tableId?: number | undefined;
    totalAmount?: number | undefined;
    orderItem: CreateOrderItemRequest[],
}

export interface CreateOrderItemRequest extends AuthUserRequest {
    recipeId?: number | undefined;
    orderId?: number | undefined;
    quantity?: number | undefined;
    amount?: number | undefined;
    totalAmount?: number | undefined;
}