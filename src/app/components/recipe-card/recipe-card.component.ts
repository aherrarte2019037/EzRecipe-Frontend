import { Component, Input, OnInit, TemplateRef, HostBinding } from '@angular/core';
import { NbMenuItem, NbMenuService, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any = null;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  userLogged$: Object = this.userService.userLogged;
  userLoggedID: any
  booleanLike: boolean = false
  booleanSave: boolean = false;
  booleanPurchased: boolean = false;
  userLoggedRecipesSave: any = []

  constructor( private userService: UserService, 
    private recipeService: RecipeService, 
    private nbMenuService: NbMenuService,
    private toastrService: NbToastrService

    ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data =>{ this.userLoggedID = data._id
      this.userLoggedRecipesSave = data.favoriteRecipes
      if(this.recipe.likes.some((userLike: any) => userLike === this.userLoggedID)) this.booleanLike = true
      if(data.purchasedRecipes.some((purchased:any)=>purchased === this.recipe._id)) this.booleanPurchased= true
      if(this.userLoggedRecipesSave.some( (saved:any) => saved === this.recipe._id )) this.booleanSave = true
    })
  }

  giveLike(id:any){
    this.recipeService.giveLike(id).subscribe(
      (data: any) => {
          this.booleanLike = !this.booleanLike

          if(this.booleanLike == true){
            this.recipe.likes.push(data.user)
          }else {
            this.recipe.likes = this.recipe.likes.filter( (userLike: any) => userLike !== data.user )
          }
      },
      error =>{

      }
    )
  }

  saveRecipe(id:any){
    this.recipeService.saveRecipe(id).subscribe(
      (data:any) => {

        this.booleanSave = !this.booleanSave

        if(this.booleanSave == true){
          console.log('Guardaste la receta')

          this.userLoggedRecipesSave.push(id)
          console.log(this.userLoggedRecipesSave)
        }else {
          console.log('Ya no esta guardada');
          this.showToastUnsaveRecipe(2000, "danger") 
          this.userLoggedRecipesSave = this.userLoggedRecipesSave.filter( (recipesSaved: any) => recipesSaved.toString() !== id )
        }
      }
    )
  }

  purchasedRecipe(id:any){

    this.userService.purchasedRecipes(id).subscribe(
      data=>{

        this.booleanPurchased = !this.booleanPurchased;

      },
      error=>{
          console.log(<any>error);
          this.showToastInsufficientEzCoins(2000,"success");
      }
    )

  }

  showToast(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      'Se ha guardado la receta',
      { duration, status });
  }

  showToastInsufficientEzCoins(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      'No tienes los suficientes EzCoins',
      { duration, status });
  }

  showToastSaveRecipe(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      '',
      'Se ha añadido a favoritas',
      { duration, status });
  }
  
  showToastUnsaveRecipe(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      '',
      'Se ha eliminado de favoritas',
      { duration, status });
  }

}
