import { PaginateRequest } from "./paginate.request";

export interface RecipeRequest extends PaginateRequest {
    id?: number;
    name?: string;
    amount?: number;
    status?: string;
}

export interface CreateRecipeRequest {
    name?: string;
    amount?: number;
    status?: string;
}
