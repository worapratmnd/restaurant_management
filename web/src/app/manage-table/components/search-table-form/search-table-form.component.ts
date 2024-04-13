import { Component, OnInit } from "@angular/core";
import { tableStatus } from "app/shared/constants/manage.table.status";

@Component({
  selector: "app-search-table-form",
  templateUrl: "./search-table-form.component.html",
  styleUrls: ["./search-table-form.component.scss"],
})
export class SearchTableFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getTableStatus() {
    return tableStatus;
  }
}
