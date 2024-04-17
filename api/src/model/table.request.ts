import { AuthUserRequest, PaginateRequest } from "./paginate.request";

export interface TableRequest extends PaginateRequest {
    id?: number;
    name?: string;
    status?: string;
}

export interface CreateTableRequest extends AuthUserRequest {
    name?: string;
    status?: string;
}
