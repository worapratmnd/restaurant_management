import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { QueryResponse } from '../interface/query-response.interface';
import { ICreateOrder, IOrder } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllOrder(order?: IOrder) {
    return this.http.post<QueryResponse<IOrder[]>>(`${environment.apiUrl}/order/search`, order);
  }

  getOrderById(id: number) {
    return this.http.get<QueryResponse<IOrder>>(`${environment.apiUrl}/order/${id}`);
  }

  createOrder(order: ICreateOrder) {
    return this.http.post<QueryResponse>(`${environment.apiUrl}/order`, order);
  }

  updateOrder(order: IOrder) {
    return this.http.put<QueryResponse>(`${environment.apiUrl}/order/${order.id}`, order);
  }
}
