import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PopupTableComponent } from "../popup-table/popup-table.component";
import { IManageTable } from "app/shared/interface/manage-table.interface";
import { getTableStatusByKey } from "app/shared/constants/manage.table.status";

@Component({
  selector: "app-manage-table-list",
  templateUrl: "./manage-table-list.component.html",
  styleUrls: ["./manage-table-list.component.scss"],
})
export class ManageTableListComponent implements OnInit {
  @Input()
  data: IManageTable[];

  @Output()
  onSelectedItem = new EventEmitter<IManageTable>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  getTableStatusByKey(key: string) {
    return getTableStatusByKey(key);
  }

  onClickItem(item: IManageTable) {
    this.onSelectedItem.emit(item);
  }
}
