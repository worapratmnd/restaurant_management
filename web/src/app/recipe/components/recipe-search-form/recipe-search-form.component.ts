import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { recipeStatus } from 'app/shared/constants/recipe.status';
import { IRecipe } from 'app/shared/interface/recipe.interface';

@Component({
  selector: 'app-recipe-search-form',
  templateUrl: './recipe-search-form.component.html',
  styleUrls: ['./recipe-search-form.component.scss']
})
export class RecipeSearchFormComponent implements OnInit {
  @Output()
  onSearch = new EventEmitter<IRecipe>();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null],
      amount: [null],
      status: [null],
    });
  }

  onClickSearch() {
    this.onSearch.emit(this.formGroup.getRawValue());
  }

  getRecipeStatus() {
    return recipeStatus;
  }

}
