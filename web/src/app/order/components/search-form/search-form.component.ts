import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { orderStatus } from 'app/shared/constants/order.status';
import { IManageTable } from 'app/shared/interface/manage-table.interface';
import { ManageTableService } from 'app/shared/services/manage-table.service';

@Component({
  selector: 'order-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  formGroup: FormGroup;

  listTable: IManageTable[] = [];

  @Output()
  onSearch = new EventEmitter<{ tableId: number, status: string }>();

  constructor(
    private formBuilder: FormBuilder,
    private manageTableService: ManageTableService,
  ) { }

  ngOnInit() {
    this.getAllTable();
    this.createForm();
  }

  getAllTable() {
    this.manageTableService.getAllTable().subscribe(response => {
      if (response.code === 200) {
        this.listTable = response.data;
      }
    });
  }

  getOrderStatus() {
    return orderStatus;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      tableId: [],
      status: [],
    });
  }

  onClickSearch() {
    this.onSearch.emit({ ...this.formGroup.getRawValue() });
  }

}
