import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem,NbDialogService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [UserService]
})
export class HomePageComponent implements OnInit {
  showContent: boolean = false;
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
      title: 'Mensajes',
      icon: 'message-circle-outline',
      badge: { text: '2', status: 'warning' }
    },
    {
      title: 'Ajustes',
      icon: 'settings-2-outline'
    }
  ];

  videoindex =0;
  videos = [{link:"https://www.youtube.com/embed/oIdj9igF6jg?autoplay=1", duration:31000},
  {link:"https://www.youtube.com/embed/dtnNU83ZyG0?autoplay=1", duration:37000},
  {link:"https://www.youtube.com/embed/ADefP_GKMJk?autoplay=1", duration:21000},
  ]
  disableModal = true;

  constructor( private spinnerService: NgxSpinnerService,private dialogService: NbDialogService, private _userService: UserService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
  }

  open(dialog: TemplateRef<any>) {
    this.disableModal = true;
    this.dialogService.open(dialog);
    setTimeout(() =>{this.disableModal= false},this.videos[this.videoindex].duration)
  }

  addThreeCoins(){

    this._userService.addThreeCoins().subscribe(
      data=>{
        console.log(data);
        this.videoindex=this.videoindex+1;

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

}
