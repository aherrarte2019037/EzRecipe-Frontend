import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showOverlay: boolean = true;

  constructor( private spinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {  
    this.spinnerBehavior();
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => {this.spinnerService.hide( 'main' ); this.showOverlay = false}, 2000 );
  }

}
