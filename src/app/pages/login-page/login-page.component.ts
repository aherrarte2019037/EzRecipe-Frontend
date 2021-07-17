import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.buildForm();

  constructor( private title: Title, private fmBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.title.setTitle( 'Iniciar Sesión' );
  }

  buildForm() {
    return this.fmBuilder.group({
      email   : [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required],
      remember: [ false ]
    });
  }

  login() {
    console.log( this.loginForm.value )
  }

}
