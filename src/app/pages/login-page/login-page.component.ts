import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { fadeInDownOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [ fadeInDownOnEnterAnimation({ duration: 500 }), fadeOutOnLeaveAnimation({ duration: 500 }) ]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.buildForm();
  @ViewChild('dialog') dialog!: TemplateRef<any>;
  
  constructor(
    private title: Title,
    private fmBuilder: FormBuilder,
    private socialService: SocialAuthService,
    private authService: AuthService,
    private dialogService: NbDialogService ) {}

  ngOnInit(): void {
    this.title.setTitle( 'Iniciar Sesión' );
  }

  buildForm() {
    return this.fmBuilder.group({
      email   : [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required],
      remember: [ false ]
    });
  }

  loginWithGoogle() {
    from( this.socialService.signIn( GoogleLoginProvider.PROVIDER_ID ) ).pipe(
      concatMap( data => this.authService.socialLogin( data ) )
    );
  }

  loginWithFacebook() {
    from( this.socialService.signIn( FacebookLoginProvider.PROVIDER_ID ) ). pipe(
      concatMap( data => this.authService.socialLogin( data ) )
    );
  }

  login() {
    if( this.loginForm.invalid ) return this.loginForm.markAllAsTouched();
    this.dialogService.open( this.dialog, { context: { title: 'Ingreso Fallido', message: 'Datos incorrectos' } } );
  }

  getFormError( input: string ) {
    const error = this.loginForm.get(input)?.errors;
    const invalid = this.loginForm.get(input)?.invalid;
    const dirty = this.loginForm.get(input)?.dirty;
    const touched = this.loginForm.get(input)?.touched;
   
    if( invalid && dirty || invalid && touched ) {
      if( 'required' in error! ) return 'Campo Requerido';
      if( 'minlength' in error! ) return `Mínimo ${error.minlength.requiredLength} caracteres`;
      if( 'maxlength' in error! ) return `Máximo ${error.maxlength.requiredLength} caracteres`;
      if( 'email' in error! ) return 'Correo Electrónico Inválido';
    }

    return null;
  }

}
