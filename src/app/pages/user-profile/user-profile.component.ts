import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any
  Username: any
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  userLoggedID: any
  booleanFollowing: boolean = false
  recipes: any = []

  constructor(private userService: UserService, public _activetedRoute: ActivatedRoute, private toastrService: NbToastrService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data =>{ this.userLoggedID = data._id
    this._activetedRoute.paramMap.subscribe( dataRoute => {
      this.Username = dataRoute.get('username')
        this.userService.getUsername(this.Username).subscribe( data => {
          this.user = data.userFound
          if(data?.userFound?.followers.some( (followers:any) => followers === this.userLoggedID )) this.booleanFollowing = true
          this.recipeService.getRecipeIdPublisher(data.userFound._id).subscribe( data => this.recipes = data)
        })
    } )
    });
  }

  followUser(id:any){
    this.userService.followUser(id).subscribe(
      data => {
        this.booleanFollowing = !this.booleanFollowing

        if(this.booleanFollowing === true){

          this.user.followers.push(this.userLoggedID);

        }else {
          this.user.followers = this.user.followers.filter( (followers: any)=>followers!==this.userLoggedID );
          this.showToastUnsaveRecipe(2000, 'danger')
        }
      }
    )
  }

  showToastUnsaveRecipe(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      '',
      'Dejaste de seguir al usuario',
      { duration, status, icon:"person-remove-outline" });
  }

}
