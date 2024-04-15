export interface QueryResponse<T = any> {
    code: number;
    message: string;
    data: T;
    total?: number;
    page?: number;
    limit?: number;
}