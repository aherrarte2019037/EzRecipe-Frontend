import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
