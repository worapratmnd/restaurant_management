import { Component, OnInit } from '@angular/core';
import { IUser } from 'app/shared/interface/user.interface';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isEdit: boolean = false;
  selectedItem: IUser;
  searchUserData: IUser;
  userList: IUser[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isEdit = false;
    this.onGetUser();
  }

  onClickAddUser() {
    this.isEdit = false;
    this.selectedItem = {
      name: null,
      password: null,
      username: null,
      id: null,
    };
  }

  onGetUser(searchData?: IUser) {
    if (searchData != undefined) {
      this.searchUserData = searchData;
    }
    this.userService.getAllUser(this.searchUserData).subscribe((result) => {
      if (result.code == 200) {
        this.userList = result.data;
      }
    });
  }

  onSelectedItem(item: IUser) {
    this.isEdit = true;
    this.selectedItem = item;
  }

  onSubmitForm(user: IUser) {
    if (this.isEdit && user.id != null) {
      this.editUser(user);
    } else {
      this.addUser(user);
    }
  }

  addUser(data: IUser) {
    this.userService.addUser(data).subscribe(response => {
      this.onGetUser();
    });
  }

  editUser(table: IUser) {
    this.userService.editUser(table).subscribe(response => {
      this.onGetUser();
    });
  }

  onRemove(data: IUser) {
    this.userService.removeUser(data).subscribe(response => {
      this.onGetUser();
    });
  }

}
