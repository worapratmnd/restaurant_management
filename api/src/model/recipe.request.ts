import { AuthUserRequest, PaginateRequest } from "./paginate.request";

export interface RecipeRequest extends PaginateRequest {
    id?: number;
    name?: string;
    amount?: number;
    status?: string;
}

export interface CreateRecipeRequest extends AuthUserRequest {
    name?: string;
    amount?: number;
    status?: string;
}
