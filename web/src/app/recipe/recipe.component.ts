import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'app/shared/interface/recipe.interface';
import { RecipeService } from 'app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  isEdit = false;

  selectedItem: IRecipe;

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.isEdit = false;
  }

  getAllRecipe() {
    return this.recipeService.getAllRecipe();
  }

  onSelectedItem(item: IRecipe) {
    this.isEdit = true;
    this.selectedItem = item;
  }

  onSubmit(item: IRecipe) {
    if (this.isEdit) {
      this.recipeService.editRecipe(item);
    } else {
      this.recipeService.addRecipe(item);
    }
  }

  onClickAdd() {
    this.isEdit = false;
    this.selectedItem = {
      id: null,
      name: null,
      amount: null,
      status: null,
    };
  }

}
