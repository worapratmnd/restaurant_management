import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from 'app/shared/services/order.service';
import { IOrder, IOrderItem } from 'app/shared/interface/order.interface';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  id: number;
  formGroup: FormGroup;

  orderData: IOrder;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.createForm();
    this.onLoadData();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      tableId: ['', Validators.required],
      totalAmount: [null, Validators.required],
      status: [null, Validators.required],
      orderItem: new FormArray([]),
    });
  }

  onLoadData() {
    this.orderService.getOrderById(this.id).subscribe(response => {
      if (response.code === 200) {
        this.orderData = response.data;
        this.onPatchFormData();
      }
    });
  }

  onPatchFormData() {
    this.formGroup.patchValue({
      tableId: this.orderData.tableId,
      totalAmount: this.orderData.totalAmount,
      status: this.orderData.status,
    });

    this.orderData.OrderItems.forEach(item => {
      this.addOrderItem(item);
    });
  }

  addOrderItem(orderItem?: IOrderItem) {
    const orderItemForm = this.formBuilder.group({
      recipeId: [orderItem?.recipeId ?? null, Validators.required],
      orderId: [orderItem?.orderId ?? null],
      quantity: [orderItem?.quantity ?? null, Validators.required],
      amount: [orderItem?.amount ?? null],
      totalAmount: [orderItem?.totalAmount ?? null],
    });
    this.orderItem.push(orderItemForm);
  }

  removeOrderItem(orderItemIndex: number) {
    this.orderItem.removeAt(orderItemIndex);
  }

  get orderItem() {
    return this.formGroup.controls["orderItem"] as FormArray;
  }

  onBack() {
    this.location.back();
  }

  onSubmit() {
    const orderBody = this.formGroup.getRawValue();
    if (this.formGroup.valid) {
      orderBody.id = this.id;
      this.orderService.updateOrder(orderBody).subscribe((response) => {
        if (response.code === 200) {
          this.onBack();
        }
      })
    }
  }

}
