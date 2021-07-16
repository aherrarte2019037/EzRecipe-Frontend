import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor( private title: Title, private http: HttpClient ) { }

  ngOnInit(): void {
    this.title.setTitle( 'Iniciar Sesión' );
  }

  login() {
    
  }

}
