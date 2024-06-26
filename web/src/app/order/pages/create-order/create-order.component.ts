import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { quantity } from 'chartist';
import { OrderService } from 'app/shared/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      tableId: ['', Validators.required],
      totalAmount: [null, Validators.required],
      status: [null, Validators.required],
      orderItem: new FormArray([]),
    });
    this.addOrderItem();
  }

  addOrderItem(orderItem?: any) {
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
      this.orderService.createOrder(orderBody).subscribe((response) => {
        if (response.code === 201) {
          this.onBack();
        }
      })
    }
  }

}
