import { Component, Input, OnInit, TemplateRef, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
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
  userLogged: any;
  userLoggedID: any
  booleanLike: boolean = false
  booleanSave: boolean = false;
  booleanPurchased: boolean = false;
  userLoggedBoughtRecipes: any = [];

  constructor( private userService: UserService,
    private recipeService: RecipeService,
    private nbMenuService: NbMenuService,
    private toastrService: NbToastrService,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data =>{ this.userLoggedID = data._id
      this.userLogged = data;
      if(this.recipe?.likes.some((userLike: any) => userLike === this.userLoggedID)) this.booleanLike = true
      if(data?.purchasedRecipes?.some((purchased:any)=>purchased === this.recipe._id)) this.booleanPurchased= true
      if(this.userLogged.favoriteRecipes?.some( (saved:any) => saved === this.recipe._id )) this.booleanSave = true
    })
  }

  giveLike(id:any){
    this.recipeService.giveLike(id).subscribe(
      data => {
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
          this.showToastSaveRecipe(2000, 'success');
          this.userLogged.favoriteRecipes.push(id)
        }else {
          this.userLogged.favoriteRecipes = this.userLogged.favoriteRecipes.filter( (recipesSaved: any) => recipesSaved.toString() !== id )
          this.showToastUnsaveRecipe(2000, 'danger')

        }
        this.userService.userLogged.next(this.userLogged)
      }
    )
  }

  purchasedRecipe(id:any){

    this.userService.purchasedRecipes(id).subscribe(
      data=>{

        this.booleanPurchased = !this.booleanPurchased;
        this.showToastBuy();
        this.userLogged.purchasedRecipes.push(id)
        this.userLogged.ezCoins-=45;
        this.userService.userLogged.next(this.userLogged);

      },
      error=>{
          console.log(<any>error);
          this.showToastInsufficientEzCoins(2000,"success");
      }
    )

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
        { duration, status, icon:"minus-circle-outline" });
  }

  showToastInsufficientEzCoins(duration: any,status: NbComponentStatus) {
    this.toastrService.show( '', `Monedas insuficientes`, { status: 'warning', icon: 'alert-circle' });
  }

  showToastBuy(){

    this.toastrService.show( '', `Receta Comprada`, { status: 'primary', icon: 'shopping-cart-outline' });
  }

  navigate(username:any){
    this.router.navigate(['/home/user-profile', username])
  }

}
