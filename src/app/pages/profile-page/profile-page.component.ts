import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation } from 'angular-animations';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [slideInRightOnEnterAnimation({ duration: 300 }), slideOutRightOnLeaveAnimation({ duration: 115 })]
})
export class ProfilePageComponent implements OnInit {
  petitionBoolean: boolean = false;
  booleanButton: boolean = true;
  textButton: String= "Solicitar ser chef";
  profileForm: FormGroup = this.buildForm()
  formActivated: boolean = false;
  formChanges: any = {};
  userLogged: any = null;
  imageUrl: string = 'https://res.cloudinary.com/dykas17bj/image/upload/';
  loading: boolean = false;
  uploader: FileUploader = new FileUploader({
    url: GlobalService.getCloudinaryUrl(),
    isHTML5: true,
    removeAfterUpload: true,
    headers: [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }
    ]
  });
  previewImage: any = null;
  imageDbName: string = '';

  constructor (
    public userService: UserService,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(data => { this.userLogged = data; this.setFormValue() });
    this.onAfterAddingFile();
    this.onBuildItemForm();
    if(this.userLogged.requestRoleChef === true) {
      this.petitionBoolean = true;
    }
  }

  //Subir Imágenes
  onAfterAddingFile() {
    this.uploader.onAfterAddingFile = (item: FileItem) => {
      const reader = new FileReader();
      this.imageDbName = `${this.userLogged._id}${Date.now()}`;
      this.profileForm.get('image')?.setValue( `${this.imageDbName}` );
      reader.onload = () => {
        this.previewImage = {
          path: reader.result as string,
          name: item.file.name
        };
      };
      reader.readAsDataURL(item._file);
    }
  }

  onBuildItemForm() {
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData) => {
      form.append('public_id', this.imageDbName);
      form.append('file', fileItem);
      form.append('upload_preset', 'recipeImage');
      fileItem.withCredentials = false;
      return { fileItem, form };
    }
  }

  setFormValue() {
    this.profileForm.patchValue(this.userLogged);
    this.profileForm.disable();

    this.profileForm.valueChanges.subscribe(value => {
      if (
        value.username === this.userLogged.username
        && value.email === this.userLogged.email
        && value.name === this.userLogged.name
        && value.lastname === this.userLogged.lastname
        && value.image === this.userLogged.image) return this.formActivated = false;

      if (value.name !== this.userLogged.name) this.formChanges.name = value.name
      if (value.lastname !== this.userLogged.lastname) this.formChanges.lastname = value.lastname
      if (value.email !== this.userLogged.email) this.formChanges.email = value.email
      if (value.username !== this.userLogged.username) this.formChanges.username = value.username
      if (value.image !== this.userLogged.image) this.formChanges.image = value.image
      return this.formActivated = true;
    })
  }

  buildForm() {
    const form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      image: [null, Validators.required]
    });

    return form;

  }

  editProfile() {
    if( this.uploader.queue.length !== 0 ) {
      this.spinnerService.show('image');
      this.spinnerService.show('form')
      this.loading = true;
    }

    this.uploader.uploadAll();

    this.uploader.response.subscribe( data => {
      this.userLogged.image = JSON.parse(data).public_id;
      this.userService.userLogged.next( this.userLogged );
    });

    this.uploader.onCompleteAll = () => {
      this.loading = false;
      this.spinnerService.hide('image')
      this.spinnerService.hide('form')
      this.deleteImage();
    }

    if ( this.profileForm.invalid ) return this.profileForm.markAllAsTouched();

    this.userService.editUser(this.formChanges, this.userLogged._id).subscribe(
      data => {
        const { image, ...edited } = data;
        if( this.uploader.queue.length !== 0 ) this.userService.userLogged.next( edited );
        else this.userService.userLogged.next( data );
        this.profileForm.disable();
        this.formChanges = {};
        this.formActivated = false;
      }
    );
  }

  petitionChefRequest() {

    this.userService.petitionChefRequest().subscribe(
      data => {
        console.log(data);
        this.userService.userLogged.subscribe(data => { this.userLogged = data })

        this.petitionBoolean = true;
        this.userLogged.requestRoleChef = true;

        if(this.petitionBoolean===true){

          this.textButton ="Esperando solicitud"
          this.booleanButton = false;

        }


      },
      error => {
        console.log(<any>error);

      }
    )

  }

  deleteImage() {
    this.uploader.clearQueue();
    this.previewImage = null;
    this.uploader.destroy();
  }

}
