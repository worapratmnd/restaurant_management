import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { recipeStatus } from 'app/shared/constants/recipe.status';
import { IRecipe } from 'app/shared/interface/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input()
  data?: IRecipe;
  @Output() onSubmit = new EventEmitter<IRecipe>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data !== undefined) {
      this.formGroup.patchValue({
        id: this.data?.id,
        name: this.data?.name,
        amount: this.data?.amount,
        status: this.data?.status,
      });
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      amount: [this.data?.amount, Validators.required],
      status: [this.data?.status, Validators.required],
    });
  }

  getRecipeStatus() {
    return recipeStatus;
  }

  onClickSubmit() {
    if (this.formGroup.valid) {
      this.onSubmit.emit({ ...this.formGroup.getRawValue(), id: this.data?.id });
    }
  }

}
