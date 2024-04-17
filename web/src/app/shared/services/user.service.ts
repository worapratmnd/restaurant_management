import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.interface';
import { QueryResponse } from '../interface/query-response.interface';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUser(data?: IUser) {
    return this.http.post<QueryResponse<IUser[]>>(`${environment.apiUrl}/user/search`, data);
  }

  addUser(data: IUser) {
    return this.http.post(`${environment.apiUrl}/user`, data);
  }

  editUser(data: IUser) {
    return this.http.put(`${environment.apiUrl}/user/${data.id}`, data);

  }

  removeUser(data: IUser) {
    return this.http.delete(`${environment.apiUrl}/user/${data.id}`);
  }
}
