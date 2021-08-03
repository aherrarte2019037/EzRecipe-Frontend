import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchased-recipes',
  templateUrl: './purchased-recipes.component.html',
  styleUrls: ['./purchased-recipes.component.css']
})
export class PurchasedRecipesComponent implements OnInit {
  disableModal = true;
  recipes: any;
  userLogged$: Object = this.userService.userLogged;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  booleanLike: boolean = false
  recipe: any;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router, private dialogService: NbDialogService,) {

  }

  ngOnInit(): void {
    this.userService.showPurchasedRecipes().subscribe(data=> this.recipes = data)
  }

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }

  getIdRecipe(id: any){
    this.recipeService.getIdRecipe(id).subscribe(
      data => {
        this.recipe = data.foundRecipes;
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.disableModal = true;
    this.dialogService.open(dialog);
  }
}
