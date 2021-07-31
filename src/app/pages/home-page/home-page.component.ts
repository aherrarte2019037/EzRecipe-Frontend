import { Component, OnInit,TemplateRef,HostBinding  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem,NbDialogService, NbWindowService,NbToastrService,NbComponentStatus   } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { AddRecipeComponent } from 'src/app/components/add-recipe/add-recipe.component';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [UserService]
})
export class HomePageComponent implements OnInit {
  showContent: boolean = false;
  videoindex =0;
  countVideoIndex = 4-this.videoindex;
  disableModal = true;
  items: NbMenuItem[] = [
    {
      title: 'Recetas',
      icon: 'book-open-outline',
      link: '/home/recipes'
    },
    {
      title: 'Perfil',
      icon: 'person-outline',
      link: '/home/profile',
      selected: true
    },
    {
      title: 'Compras',
      icon: 'credit-card-outline',
      link: '/home/purchasedRecipes'
    },
    {
      title: 'Guardado',
      icon: 'archive-outline',
    },
    {
      title: 'Suscripciones',
      icon: 'star-outline',
      link: '/subscription'
    },
    {
      title: 'Ajustes',
      icon: 'settings-2-outline'
    }
  ];
  videos = [
    { link: "https://www.youtube.com/embed/oIdj9igF6jg?autoplay=1", duration: 1000 },
    { link: "https://www.youtube.com/embed/dtnNU83ZyG0?autoplay=1", duration: 37000 },
    { link: "https://www.youtube.com/embed/ADefP_GKMJk?autoplay=1", duration: 21000 },
  ]
  userLogged: any = null;
  userLogged$: any = this.userService.userLogged;
  recipes: any;
  chefRequests: any;
  popularRecipes: any = [];
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';

  constructor(
    private spinnerService: NgxSpinnerService,
    private dialogService: NbDialogService,
    private _userService: UserService,
    private windowService: NbWindowService,
    private userService: UserService,
    private recipeService: RecipeService,
    private toastrService: NbToastrService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
    this.userService.userLogged.subscribe( data => {
      this.userLogged = data;
      if( !this.userLogged?.image ) this.spinnerService.show('profileImage');
      if( this.userLogged?.image ) this.spinnerService.hide('profileImage');
    })
    this.recipeService.getRecipes().subscribe( data => { this.recipes = data; this.sortArrayByLikes() })
    this.userService.getChefRequests().subscribe(data=> this.chefRequests = data);
  }

  sortArrayByLikes() {
    const recipes = this.recipes;
    this.popularRecipes = recipes.sort( ( a: any, b: any ) => {
      if( a.likes.length > b.likes.length ) return 1;
      if( a.likes.length < b.likes.length ) return -1;
      return 0;
    });
  }

  open(dialog: TemplateRef<any>) {
    this.disableModal = true;
    this.dialogService.open(dialog);
    setTimeout(() =>{this.disableModal= false},this.videos[this.videoindex].duration)
  }

  addThreeCoins(){
    this._userService.addThreeCoins().subscribe(
      data=>{
        this.videoindex=this.videoindex + 1,
        this.showToast(3000, "success")
        this.userLogged.ezCoins = this.userLogged.ezCoins + 3
        this.userService.userLogged.next(this.userLogged)
      },

      error=> error
    )
    this.userService.userLogged.subscribe( data => this.userLogged = data )
  }

  confirmChefRquest(id: String){
    this._userService.confirmChefRquest(id).subscribe(
      data=>{
        console.log(data);
        this.userService.getChefRequests().subscribe(data=> this.chefRequests = data)
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  cancelChefRquest(id: String){
    this._userService.cancelChefRequest(id).subscribe(
      data=>{
        console.log(data);
        this.userService.getChefRequests().subscribe(data=> this.chefRequests = data)
      },
      error=>{
        console.log(<any>error);

      }
    )
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => { this.showContent = true; this.spinnerService.hide( 'main' ) }, 2000 );
  }

  openAddModal() {
    this.windowService.open( AddRecipeComponent, { context: { userLogged: this.userLogged }, closeOnBackdropClick: false, windowClass: 'add-recipe-window' } )
  }

  showToast(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      `Has visto ${this.videoindex} de 3 videos`,
      'Has ganado 3 EzCoins',
      { duration, status });
  }

  showToastBuy(duration: any,status: NbComponentStatus) {
    this.toastrService.show( '', `Receta Comprada`, { status: 'primary', icon: 'shopping-cart-outline' });
  }

}