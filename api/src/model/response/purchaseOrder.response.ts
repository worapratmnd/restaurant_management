export interface PurchaseOrderResponse {
    id: number;
    delivery: string;
    paymentTerm: string;
    poDate: string;
    poCode: string;
    projectId: number;
    refqno: string;
    sendDate: string;
    shipToAddress: string;
    shipToName: string;
    validity: string;
    vendor: string;
    vendorAddress: string;
    vendorName: string;
    warranty: string;
    createdAt: string;
    updatedAt: string;
    purchaseOrderItem: PurchaseOrderItemResponse[];
    project: ProjectResponse;
}

export interface PurchaseOrderItemResponse {
    id: number;
    amount: string;
    description: string;
    discount: string;
    partNumber: string | null;
    purchaseOrderId: number;
    qty: string;
    unitPrice: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectResponse {
    id: number;
    code: string;
    name: string;
    startDate: string;
    endDate: string;
    actualCost: string;
    sellPrice: string;
    status: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}