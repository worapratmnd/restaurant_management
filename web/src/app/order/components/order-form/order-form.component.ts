import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { orderStatus } from 'app/shared/constants/order.status';
import { IManageTable } from 'app/shared/interface/manage-table.interface';
import { IRecipe } from 'app/shared/interface/recipe.interface';
import { ManageTableService } from 'app/shared/services/manage-table.service';
import { RecipeService } from 'app/shared/services/recipe.service';
import { quantity } from 'chartist';

@Component({
  selector: 'order-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input()
  formGroup: FormGroup;

  @Output()
  onAddRecipe = new EventEmitter();

  @Output()
  onRemoveOrderItem = new EventEmitter<number>();

  listTable: IManageTable[] = [];
  listRecipe: IRecipe[] = [];

  constructor(
    private manageTableService: ManageTableService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.getAllTable();
    this.getAllRecipe();
  }

  getAllTable() {
    this.manageTableService.getAllTable().subscribe(response => {
      if (response.code === 200) {
        this.listTable = response.data;
      }
    });
  }

  getAllRecipe() {
    this.recipeService.getAllRecipe().subscribe(response => {
      if (response.code === 200) {
        this.listRecipe = response.data;
      }
    });
  }

  onAddOrderItem() {
    this.onAddRecipe.emit();
  }

  onClickRemoveItem(index: number) {
    this.onRemoveOrderItem.emit(index);
  }

  onSelectedItem(index: number, recipe?: IRecipe) {
    if (recipe) {
      const quantity = this.orderItem.controls[index]['controls']?.quantity?.value ?? 1;
      this.orderItem.controls[index].patchValue({
        amount: recipe.amount,
        totalAmount: recipe.amount * quantity,
        quantity: quantity,
      });
    } else {
      this.orderItem.controls[index].reset();
    }
  }

  get orderItem() {
    return this.formGroup.controls["orderItem"] as FormArray;
  }

  getOrderStatus() {
    return orderStatus;
  }

}
