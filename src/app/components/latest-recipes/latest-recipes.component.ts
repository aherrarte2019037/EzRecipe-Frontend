import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { AddRecipeComponent } from 'src/app/components/add-recipe/add-recipe.component';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-recipes',
  templateUrl: './latest-recipes.component.html',
  styleUrls: ['./latest-recipes.component.css']
})
export class LatestRecipesComponent implements OnInit {
  showContent: boolean = false;
  userLogged: any = null;
  urlImg = 'https://res.cloudinary.com/dykas17bj/image/upload/'
  recipes: any = [];

  constructor(
    private windowService: NbWindowService,
    private userService: UserService,
    private recipeService: RecipeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.recipeService.getLatest().subscribe( data => this.recipes = data );
    this.userService.userLogged.subscribe( data => this.userLogged = data )
  }

  openAddModal() {
    this.windowService.open( AddRecipeComponent, { context: { userLogged: this.userLogged }, closeOnBackdropClick: false, windowClass: 'add-recipe-window'} )
  }

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }

}
