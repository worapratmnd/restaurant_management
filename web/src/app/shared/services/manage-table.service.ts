import { Injectable } from "@angular/core";
import { IManageTable } from "../interface/manage-table.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { QueryResponse } from "../interface/query-response.interface";

@Injectable({
  providedIn: "root",
})
export class ManageTableService {

  constructor(private http: HttpClient) { }


  getAllTable(body: IManageTable) {
    return this.http.post<QueryResponse<IManageTable[]>>(`${environment.apiUrl}/table/search`, body);
  }

  addTable(table: IManageTable) {
    return this.http.post(`${environment.apiUrl}/table`, table);
  }

  editTable(table: IManageTable) {
    return this.http.put(`${environment.apiUrl}/table/${table.id}`, table);

  }

  removeTable(table: IManageTable) {
    return this.http.delete(`${environment.apiUrl}/table/${table.id}`);
  }
}
