import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: any = [];

  constructor( private recipeService: RecipeService ) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe( data => this.recipes = data )
  }

}
