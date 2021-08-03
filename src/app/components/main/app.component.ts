import { Component } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as spanish } from 'ngx-timeago/language-strings/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( intl: TimeagoIntl ) {
    intl.strings = spanish;
    intl.changes.next();
  }
  
}
