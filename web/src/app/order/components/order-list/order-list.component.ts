import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getOrderStatusByKey } from 'app/shared/constants/order.status';
import { IOrder } from 'app/shared/interface/order.interface';

@Component({
  selector: 'order-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input()
  orderList: IOrder[];

  @Output()
  onItemClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  getOrderStatus(key: string) {
    return getOrderStatusByKey(key);
  }

  onClickItem(id: number) {
    this.onItemClick.emit(id);
  }

}
