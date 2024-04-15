import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { tableStatus } from "app/shared/constants/manage.table.status";
import { IManageTable } from 'app/shared/interface/manage-table.interface';

@Component({
  selector: "app-search-table-form",
  templateUrl: "./search-table-form.component.html",
  styleUrls: ["./search-table-form.component.scss"],
})
export class SearchTableFormComponent implements OnInit {
  @Output()
  onSearch = new EventEmitter<IManageTable>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      status: [null],
    });
  }


  getTableStatus() {
    return tableStatus;
  }

  onClickSearch() {
    this.onSearch.emit(this.formGroup.getRawValue());
  }

}
