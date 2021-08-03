import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor( private dialogService: NbDialogService ) { }

  ngOnInit(): void {
  }

  open( dialog: any ) {
    this.dialogService.open( dialog, { context: { title: 'Titulo', message: 'Mensaje' } })
  }

}
