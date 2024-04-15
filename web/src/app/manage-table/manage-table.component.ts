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

  tableList: IManageTable[];
  selectedItem: IManageTable;
  searchTableData: IManageTable;

  constructor(
    private dialog: MatDialog,
    private manageTableService: ManageTableService
  ) { }

  ngOnInit() {
    this.isEdit = false;
    this.onGetTable();
  }

  onClickAddTable() {
    this.isEdit = false;
    this.selectedItem = {
      name: null,
      status: null,
    };
  }

  onGetTable(searchData?: IManageTable) {
    if (searchData != undefined) {
      this.searchTableData = searchData;
    }
    this.manageTableService.getAllTable(this.searchTableData).subscribe((result) => {
      if (result.code == 200) {
        this.tableList = result.data;
      }
    });
  }

  onSelectedItem(item: IManageTable) {
    this.isEdit = true;
    this.selectedItem = item;
  }

  onSubmitForm(table: IManageTable) {
    if (this.isEdit && table.id != null) {
      this.editTable(table);
    } else {
      this.addTable(table);
    }
  }

  addTable(table: IManageTable) {
    this.manageTableService.addTable(table).subscribe(response => {
      this.onGetTable();
    });
  }

  editTable(table: IManageTable) {
    this.manageTableService.editTable(table).subscribe(response => {
      this.onGetTable();
    });
  }

  onRemove(table: IManageTable) {
    this.manageTableService.removeTable(table).subscribe(response => {
      this.onGetTable();
    });
  }
}
