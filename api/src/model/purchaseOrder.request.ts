import { PaginateRequest } from './paginate.request';
import { CreatePurchaseOrderItem } from './purchaseOrderItem.request'
export interface PurchaseOrderRequest extends PaginateRequest {
    id?: number;
    delivery?: string;
    paymentTerm?: string;
    poDate?: Date;
    poCode?: string;
    projectId?: number;
    refqno?: string;
    sendDate?: Date;
    shipToAddress?: string;
    shipToName?: string;
    validity?: string;
    vendor?: string;
    vendorAddress?: string;
    vendorName?: string;
    warranty?: string;
}

export interface CreatePurchaseOrder {
    delivery?: string;
    paymentTerm?: string;
    poDate?: Date;
    poCode?: string;
    projectId?: number;
    refqno?: string;
    sendDate?: Date;
    shipToAddress?: string;
    shipToName?: string;
    validity?: string;
    vendor?: string;
    vendorAddress?: string;
    vendorName?: string;
    warranty?: string;
    purchaseOrderItem: CreatePurchaseOrderItem[];
}