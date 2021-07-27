import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup = this.buildForm()
  formActivated: boolean = false;
  formChanges: any = {};
  userLogged: any;
  userProfile: any;
  username: any

  constructor(private renderer: Renderer2, public userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userService.userLogged.subscribe( data =>{ this.userLogged = data })
  }

  setFormValue(){
    this.profileForm.patchValue( this.userLogged );
    this.profileForm.valueChanges.subscribe( value => {
      if(
        value.username === this.userLogged.username
        && value.email === this.userLogged.email
        && value.name === this.userLogged.name
        && value.lastname === this.userLogged.lastname) return this.formActivated = false;

        if( value.name !== this.userLogged.name ) this.formChanges.name = value.name
        if( value.lastname !== this.userLogged.lastname ) this.formChanges.lastname = value.lastname
        if( value.email !== this.userLogged.email ) this.formChanges.email = value.email
        if( value.username !== this.userLogged.username ) this.formChanges.username = value.username
        return this.formActivated = true;
    } )
  }

  buildForm(){
    const form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      profileImg: [''],
    });

    return form;

  }

  showEdit( edit: HTMLElement, close: HTMLElement, action: boolean ){
    if(action){
      this.renderer.setStyle(edit, 'display', 'none')
      this.renderer.setStyle(edit, 'display', 'block')

    }else {
      this.renderer.setStyle( edit, 'display', 'block' )
      this.renderer.setStyle( close, 'display', 'none' )
    }

  }

  /*editProfile(){
    this.userService.editUser(this.formChanges, this.userLogged._id).subscribe(
      () => {

        this.formChanges = {};
      },
      error => {
        console.log(<any>error)
      }
    )
    this.desactiveForm();

  }*/

  petitionChefRequest(){

    this.userService.petitionChefRequest().subscribe(
      data=>{
        console.log(data);
        this.userService.userLogged.subscribe( data =>{ this.userLogged = data })


      },
      error=>{
        console.log(<any>error);

      }
    )

  }

  desactiveForm(){
    this.formActivated = false;
  }

}
