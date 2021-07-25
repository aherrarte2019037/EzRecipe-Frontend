import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem,NbDialogService, NbWindowService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { AddRecipeComponent } from 'src/app/components/add-recipe/add-recipe.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [UserService]
})
export class HomePageComponent implements OnInit {
  showContent: boolean = false;
  videoindex =0;
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
      icon: 'credit-card-outline'
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
    { link: "https://www.youtube.com/embed/oIdj9igF6jg?autoplay=1", duration: 31000 },
    { link: "https://www.youtube.com/embed/dtnNU83ZyG0?autoplay=1", duration: 37000 },
    { link: "https://www.youtube.com/embed/ADefP_GKMJk?autoplay=1", duration: 21000 },
  ]
  userLogged: any = null;

  constructor(
    private spinnerService: NgxSpinnerService,
    private dialogService: NbDialogService,
    private _userService: UserService,
    private windowService: NbWindowService,
    private userService: UserService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
    this.userService.userLogged.subscribe( data => this.userLogged = data.userFound )
  }

  open(dialog: TemplateRef<any>) {
    this.disableModal = true;
    this.dialogService.open(dialog);
    setTimeout(() =>{this.disableModal= false},this.videos[this.videoindex].duration)

  }

  addThreeCoins(){
    this._userService.addThreeCoins().subscribe(
      data=> this.videoindex=this.videoindex + 1,
      error=> error
    )
    this.userService.userLogged.subscribe( data => this.userLogged = data )
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => { this.showContent = true; this.spinnerService.hide( 'main' ) }, 2000 );
  }

  openAddModal() {
    this.windowService.open( AddRecipeComponent, { context: { userLogged: this.userLogged }, closeOnBackdropClick: false, windowClass: 'add-recipe-window' } )
  }

}
