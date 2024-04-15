import { Injectable } from "@angular/core";
import { IRecipe } from '../interface/recipe.interface';
import { HttpClient } from "@angular/common/http";
import { QueryResponse } from "../interface/query-response.interface";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private http: HttpClient
  ) { }

  getAllRecipe(data?: IRecipe) {
    return this.http.post<QueryResponse<IRecipe[]>>(`${environment.apiUrl}/recipe/search`, data);
  }

  addRecipe(recipe: IRecipe) {
    return this.http.post(`${environment.apiUrl}/recipe`, recipe);
  }

  editRecipe(recipe: IRecipe) {
    return this.http.put(`${environment.apiUrl}/recipe/${recipe.id}`, recipe);

  }

  removeRecipe(recipe: IRecipe) {
    return this.http.delete(`${environment.apiUrl}/recipe/${recipe.id}`);
  }
}


