import { Component, Input, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
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

  constructor( private userService: UserService, private recipeService: RecipeService, private nbMenuService: NbMenuService ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data =>{ this.userLoggedID = data._id
      if(this.recipe.likes.some((userLike: any) => userLike === this.userLoggedID)) this.booleanLike = true
      if(data.purchasedRecipes.some((purchased:any)=>purchased === this.recipe._id)) this.booleanPurchased= true
    })
    this.nbMenuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'my-context-menu'),
    ).subscribe((event) => {
    if (event.item.title === 'Guardar') {
      console.log(event.item.data.recipe)
      this.saveRecipe(event.item.data.recipe)
    }
  });
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
        }else {
          console.log('Ya no esta guardada')
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
      }
    )

  }

}
