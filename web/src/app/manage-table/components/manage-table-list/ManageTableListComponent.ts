import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupTableComponent } from '../popup-table/popup-table.component';


@Component({
    selector: 'app-manage-table-list',
    templateUrl: './manage-table-list.component.html',
    styleUrls: ['./manage-table-list.component.scss']
})
export class ManageTableListComponent implements OnInit {

    constructor(
        public dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    onClickItem() {
        this.dialog.open(PopupTableComponent);
    }

}
