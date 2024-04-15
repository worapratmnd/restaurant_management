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
  searchDataItem: IRecipe;
  recipeList: IRecipe[];

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.isEdit = false;
    this.getAllRecipe();
  }

  getAllRecipe(searchData?: IRecipe) {
    if (searchData != undefined) {
      this.searchDataItem = searchData;
    }
    return this.recipeService.getAllRecipe(this.searchDataItem).subscribe(response => {
      if (response.code == 200) {
        this.recipeList = response.data;
      }
    });
  }

  onSelectedItem(item: IRecipe) {
    this.isEdit = true;
    this.selectedItem = item;
  }

  onSubmit(item: IRecipe) {
    if (this.isEdit) {
      this.editRecipe(item);
    } else {
      this.addRecipe(item);
    }
  }

  addRecipe(item: IRecipe) {
    this.recipeService.addRecipe(item).subscribe(response => {
      this.getAllRecipe();
    });
  }

  editRecipe(item: IRecipe) {
    this.recipeService.editRecipe(item).subscribe(response => {
      this.getAllRecipe();
    });
  }

  onRemove(item: IRecipe) {
    this.recipeService.removeRecipe(item).subscribe(response => {
      this.getAllRecipe();
    });;
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
