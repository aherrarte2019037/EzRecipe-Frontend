import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { fadeInDownOnEnterAnimation, fadeInExpandOnEnterAnimation, fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  animations: [ fadeInDownOnEnterAnimation({ duration: 500 }), fadeOutOnLeaveAnimation({ duration: 500 }), fadeInUpOnEnterAnimation({ translate: '40px', duration: 300 }) ]
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup = this.buildForm();
  @ViewChild('dialog') dialog!: TemplateRef<any>;

  constructor(
    private title: Title,
    private fmBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private fmValidatorService: FormValidatorService,
    private authService: AuthService ) { }

  ngOnInit(): void {
    this.title.setTitle( 'Crear Cuenta' );
  }

  buildForm() {
    return this.fmBuilder.group({
      name         : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname     : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      username     : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email        : ['', [ Validators.required, Validators.email ] ],
      password     : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      passwordMatch: ['', Validators.required]
    },
    { validators: this.fmValidatorService.fieldsMatch( 'password', 'passwordMatch' ) });
  }

  getFormError( input: string ) {
    const { errors, invalid, dirty, touched } = this.registerForm.get(input)!;
   
    if( invalid && dirty || invalid && touched ) {
      if( 'required' in errors! ) return 'Campo requerido';
      if( 'minlength' in errors! ) return `Mínimo ${errors.minlength.requiredLength} caracteres`;
      if( 'maxlength' in errors! ) return `Máximo ${errors.maxlength.requiredLength} caracteres`;
      if( 'email' in errors! ) return 'Correo electrónico Inválido';
      if( 'match' in errors! ) return 'Contraseñas no coinciden';
    }

    return null;
  }

  register() {
    if( this.registerForm.invalid ) return this.registerForm.markAllAsTouched();

    this.authService.register( this.registerForm.value ).subscribe(
      data => this.dialogService.open( this.dialog, { context: { title: 'Registro Exitoso', message: `Bienvenido ${data.name}`, success: true } } ),
      error => this.dialogService.open( this.dialog, { context: { title: 'Error Al Registrarse', message: error.error.message, success: false } } )
    );
  }

}
