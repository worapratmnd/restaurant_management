import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PopupTableComponent } from "./components/popup-table/popup-table.component";
import { ManageTableService } from "app/shared/services/manage-table.service";
import { IManageTable } from "app/shared/interface/manage-table.interface";

@Component({
  selector: "app-manage-table",
  templateUrl: "./manage-table.component.html",
  styleUrls: ["./manage-table.component.scss"],
})
export class ManageTableComponent implements OnInit {
  isEdit: boolean = false;

  selectedItem: IManageTable;

  constructor(
    private dialog: MatDialog,
    private manageTableService: ManageTableService
  ) { }

  ngOnInit() {
    this.isEdit = false;
  }

  onClickAddTable() {
    this.isEdit = false;
    this.selectedItem = {
      name: null,
      status: null,
    };
  }

  onGetTable() {
    return this.manageTableService.getAllTable();
  }

  onSelectedItem(item: IManageTable) {
    this.isEdit = true;
    this.selectedItem = item;
  }

  onSubmitForm(table: IManageTable) {
    console.log(`Submit`);
    console.log(table);
    if (this.isEdit && table.id != null) {
      this.manageTableService.editTable(table);
    } else {
      this.manageTableService.addTable(table);
    }
  }

  onRemove(table: IManageTable) {
    this.manageTableService.removeTable(table);
  }
}
