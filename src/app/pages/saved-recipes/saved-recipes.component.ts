import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent implements OnInit {
  recipes: any
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  booleanSave: boolean = true;
  userLoggedRecipesSave: any = []

  constructor(private userService: UserService, private recipeService: RecipeService, private toastrService: NbToastrService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getSavedRecipes().subscribe( data => { this.recipes = data
      this.userLoggedRecipesSave = data._id
      //if(this.userLoggedRecipesSave.some( (saved:any) => saved === data._id )) this.booleanSave = true

    })
  }

  /*saveRecipe(id:any){
    this.recipeService.saveRecipe(id).subscribe(
      (data:any) => {

        this.booleanSave = !this.booleanSave

        if(this.booleanSave == true){
          //this.showToastSaveRecipe(2000,'success')
          this.userLoggedRecipesSave.push(id)
        }else {
          this.showToastUnsaveRecipe(2000, "danger")
          this.userLoggedRecipesSave = this.userLoggedRecipesSave.filter( (recipesSaved: any) => recipesSaved.toString() !== id )
        }
      }
    )
  }*/

  showToastUnsaveRecipe(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      '',
      'Se ha eliminado de favoritas',
      { duration, status });
  }

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }

}
