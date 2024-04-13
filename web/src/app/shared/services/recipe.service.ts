import { Injectable } from "@angular/core";
import { IRecipe } from '../interface/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeList: IRecipe[] = [
    {
      id: 1,
      name: "ข้าวผัดไก่",
      amount: 70,
      status: "A",
    },
  ];
  recipeId: number = 1;

  constructor() { }

  getRecipeId() {
    return ++this.recipeId;
  }
  getAllRecipe() {
    return this.recipeList;
  }

  addRecipe(recipe: IRecipe) {
    recipe.id = this.getRecipeId();
    this.recipeList.push(recipe);
  }

  editRecipe(recipe: IRecipe) {
    const item = this.recipeList.find((item) => item.id == recipe.id);
    item.name = recipe.name;
    item.status = recipe.status;
  }

  removeRecipe(recipe: IRecipe) {
    this.recipeList = this.recipeList.filter((item) => item.id != recipe.id);
  }
}


