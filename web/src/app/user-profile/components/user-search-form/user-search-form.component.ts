import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from 'app/shared/interface/user.interface';

@Component({
  selector: 'app-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent implements OnInit {
  @Output()
  onSearch = new EventEmitter<IUser>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      username: [null],
    });
  }



  onClickSearch() {
    this.onSearch.emit(this.formGroup.getRawValue());
  }

}
