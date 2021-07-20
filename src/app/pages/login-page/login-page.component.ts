import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { fadeInDownOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [ fadeInDownOnEnterAnimation({ duration: 500 }), fadeOutOnLeaveAnimation({ duration: 500 }), fadeInUpOnEnterAnimation({ translate: '40px', duration: 300 }) ]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.buildForm();
  @ViewChild('dialog') dialog!: TemplateRef<any>;
  
  constructor(
    private title: Title,
    private fmBuilder: FormBuilder,
    private socialService: SocialAuthService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    public spinnerService: NgxSpinnerService ) {}

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
    ).subscribe(
      data => this.dialogService.open( this.dialog, { context: { title: 'Ingreso Exitoso', message: `Bienvenido ${data.user.name}`, success: true } } ),
      error => this.dialogService.open( this.dialog, { context: { title: 'Ingreso Fallido', message: error?.error?.message || 'Error inesperado', success: false } })
    );
  }

  loginWithFacebook() {
    from( this.socialService.signIn( FacebookLoginProvider.PROVIDER_ID ) ). pipe(
      concatMap( data => this.authService.socialLogin( data ) )
    ).subscribe(
      data => this.dialogService.open( this.dialog, { context: { title: 'Ingreso Exitoso', message: `Bienvenido ${data.user.name}`, success: true } } ),
      error => this.dialogService.open( this.dialog, { context: { title: 'Ingreso Fallido', message: error?.error?.message || 'Error inesperado', success: false } })
    );
  }

  login() {
    if( this.loginForm.invalid ) return this.loginForm.markAllAsTouched();

    const { email, password, remember } = this.loginForm.value;

    this.authService.login( email, password, remember ).subscribe(
      data => {
        this.dialogService.open( this.dialog, { context: { title: 'Ingreso Exitoso', message: `Bienvenido ${data.user.name}`, success: true } } );
        this.spinnerService.show( 'main' );
        this.loginForm.reset();
      },
      error => this.dialogService.open( this.dialog, { context: { title: 'Ingreso Fallido', message: error?.error?.message || 'Error inesperado', success: false } } )
    );
  }

  getFormError( input: string ) {
    const { errors, invalid, dirty, touched } = this.loginForm.get(input)!;
   
    if( invalid && dirty || invalid && touched ) {
      if( 'required' in errors! ) return 'Campo Requerido';
      if( 'minlength' in errors! ) return `Mínimo ${errors.minlength.requiredLength} caracteres`;
      if( 'maxlength' in errors! ) return `Máximo ${errors.maxlength.requiredLength} caracteres`;
      if( 'email' in errors! ) return 'Correo Electrónico Inválido';
    }

    return null;
  }

}
