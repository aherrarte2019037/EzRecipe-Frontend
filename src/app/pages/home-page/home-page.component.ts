import { Component, OnInit,TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbMenuItem,NbDialogService } from '@nebular/theme';

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
      icon: 'message-circle-outline',
      badge: { text: '2', status: 'warning' }
    },
    {
      title: 'Ajustes',
      icon: 'settings-2-outline'
    }
  ];

  constructor( private spinnerService: NgxSpinnerService,private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.spinnerBehavior();
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => { this.showContent = true; this.spinnerService.hide( 'main' ) }, 2000 );
  }

}
