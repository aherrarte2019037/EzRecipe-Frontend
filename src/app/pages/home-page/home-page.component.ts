import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showOverlay: boolean = true;

  items: NbMenuItem[] = [
    {
      title: 'Inicio',
      icon: 'home-outline',
      link: '/home'
    },
    {
      title: 'Mis Recetas',
      icon: 'archive-outline',
    },
    {
      title: 'Recetas',
      icon: 'book-outline',
      link: '/home/recipes'
    },
    {
      title: 'Perfil',
      icon: 'person-outline',
      link: '/home/profile'
    },
  ];

  constructor( private spinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => {this.spinnerService.hide( 'main' ); this.showOverlay = false}, 2000 );
  }

}
