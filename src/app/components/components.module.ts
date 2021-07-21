import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NebularModule } from '../nebular.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { LatestRecipesComponent } from './latest-recipes/latest-recipes.component';

@NgModule({
  declarations: [
    NavbarComponent,
    RecipeCardComponent,
    LatestRecipesComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ],
  exports: [
    NavbarComponent,
    RecipeCardComponent,
    LatestRecipesComponent
  ]
})
export class ComponentsModule { }
