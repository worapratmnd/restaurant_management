import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'app/shared/interface/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input()
  data: IUser[];

  @Output()
  onSelectedItem = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit() {
  }


  onClickItem(item: IUser) {
    this.onSelectedItem.emit(item);
  }

}
