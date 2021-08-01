import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchased-recipes',
  templateUrl: './purchased-recipes.component.html',
  styleUrls: ['./purchased-recipes.component.css']
})
export class PurchasedRecipesComponent implements OnInit {

  recipes: any;
  userLogged$: Object = this.userService.userLogged;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  booleanLike: boolean = false

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.showPurchasedRecipes().subscribe(data=> this.recipes = data)
  }

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }
}
