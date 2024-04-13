import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getRecipeStatusByKey } from 'app/shared/constants/recipe.status';
import { IRecipe } from 'app/shared/interface/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input()
  listData: IRecipe[];

  @Output()
  onSelectedItem = new EventEmitter<IRecipe>();

  constructor() { }

  ngOnInit() {
  }

  onClickItem(item: IRecipe) {
    this.onSelectedItem.emit(item);
  }

  getRecipeStatus(key: string) {
    return getRecipeStatusByKey(key);
  }

}
