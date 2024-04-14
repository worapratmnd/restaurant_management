import { type PaginateRequest } from './paginate.request';

export interface ProjectRequest extends PaginateRequest {
  id?: number | undefined;
  code?: string | undefined;
  name?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  actualCost?: number | undefined;
  sellPrice?: number | undefined;
  status?: boolean | undefined;
  description?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface CreateProjectRequest {
  code?: string | undefined;
  name?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  actualCost?: number | undefined;
  sellPrice?: number | undefined;
  status?: boolean | undefined;
  description?: string | undefined;
}
