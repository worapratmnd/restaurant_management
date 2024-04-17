export interface PaginateRequest {
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface AuthUserRequest {
  user: string;
  createdBy: string;
  updatedBy: string;
}