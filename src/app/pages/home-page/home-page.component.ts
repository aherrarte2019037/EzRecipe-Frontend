import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
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
      icon: 'message-circle-outline'
    },
    {
      title: 'Ajustes',
      icon: 'settings-2-outline'
    }
  ];

  constructor( private spinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => { this.showContent = true; this.spinnerService.hide( 'main' ) }, 2000 );
  }

}
