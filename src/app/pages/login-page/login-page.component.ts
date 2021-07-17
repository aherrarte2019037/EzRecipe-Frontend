import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.buildForm();

  constructor( private title: Title, private fmBuilder: FormBuilder, private socialService: SocialAuthService ) {}

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

  loginWithGoogle() {
    this.socialService.signIn( GoogleLoginProvider.PROVIDER_ID )
      .then( data => console.log(data) )
      .catch( err => err );
  }

  loginWithFacebook() {
    this.socialService.signIn( FacebookLoginProvider.PROVIDER_ID )
      .then( data => console.log(data) )
      .catch( err => console.log(err) );
  }

  login() {
    console.log( this.loginForm.value )
  }

}
