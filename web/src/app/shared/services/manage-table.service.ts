import { Injectable } from "@angular/core";
import { IManageTable } from "../interface/manage-table.interface";

@Injectable({
  providedIn: "root",
})
export class ManageTableService {
  tableList: IManageTable[] = [
    {
      id: 1,
      name: "โต๊ะริมหน้าต่าง",
      status: "A",
    },
  ];
  tableId: number = 1;

  constructor() {}

  getTableId() {
    return ++this.tableId;
  }
  getAllTable() {
    return this.tableList;
  }

  addTable(table: IManageTable) {
    table.id = this.getTableId();
    this.tableList.push(table);
  }

  editTable(table: IManageTable) {
    const item = this.tableList.find((item) => item.id == table.id);
    item.name = table.name;
    item.status = table.status;
  }

  removeTable(table: IManageTable) {
    this.tableList = this.tableList.filter((item) => item.id != table.id);
  }
}
