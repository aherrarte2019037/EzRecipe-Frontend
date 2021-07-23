import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NebularModule } from '../nebular.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { LatestRecipesComponent } from './latest-recipes/latest-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    NavbarComponent,
    RecipeCardComponent,
    LatestRecipesComponent,
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FileUploadModule,
    CloudinaryModule
  ],
  exports: [
    NavbarComponent,
    RecipeCardComponent,
    LatestRecipesComponent,
    NebularModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
