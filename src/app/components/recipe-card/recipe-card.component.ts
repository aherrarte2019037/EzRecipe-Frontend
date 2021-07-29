import { Component, Input, OnInit } from '@angular/core';
import { NbPosition, NbTrigger } from '@nebular/theme';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  position: NbPosition = NbPosition.BOTTOM_START;
  @Input() recipe: any = null;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  userLogged$: Object = this.userService.userLogged;
  userLoggedID: any
  booleanLike: boolean = false

  constructor( private userService: UserService, private recipeService: RecipeService ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data =>{ this.userLoggedID = data._id
      if(this.recipe.likes.some((userLike: any) => userLike === this.userLoggedID)) this.booleanLike = true
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

}
