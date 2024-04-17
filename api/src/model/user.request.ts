import { AuthUserRequest, PaginateRequest } from "./paginate.request";

export interface UserRequest extends PaginateRequest {
    id?: number;
    username?: string
    name?: string;
    password?: string;
}

export interface CreateUserRequest extends AuthUserRequest {
    username?: string
    name?: string;
    password?: string;
}
