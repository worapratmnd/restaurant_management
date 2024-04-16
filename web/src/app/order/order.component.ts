import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'app/shared/interface/order.interface';
import { OrderService } from 'app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: IOrder[] = [];
  searchOrder: IOrder;

  constructor(
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getAllOrder();
  }

  onClickCreateOrder() {
    this.router.navigate(['/order/create']);
  }

  onClickEdit(id: number) {
    this.router.navigate([`/order/edit/${id}`]);
  }

  getAllOrder() {
    this.orderService.getAllOrder(this.searchOrder).subscribe(response => {
      if (response.code === 200) {
        this.orderList = response.data;
      }
    });
  }

  onSearch(searchOrder) {
    this.searchOrder = searchOrder;
    this.getAllOrder();
  }

}
