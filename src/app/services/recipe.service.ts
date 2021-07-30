import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = this.globalService.getApiUrl();

  constructor( private globalService: GlobalService, private http: HttpClient ) { }

  addRecipe( recipe: {} ) {
    return this.http.post( `${this.apiUrl}/addRecipe`, recipe )
  }

  getRecipes(): Observable<any>{
    return this.http.get( `${this.apiUrl}/getRecipe` )
  }

  getLatest() {
    return this.http.get( `${this.apiUrl}/latestRecipes` )
  }

  giveLike(id: string){

    return this.http.get<any>( `${this.apiUrl}/giveLikes/${id}`, {})
  }

  saveRecipe(id: string){

    return this.http.get<any>( `${this.apiUrl}/saveRecipe/${id}`)
  }

}
