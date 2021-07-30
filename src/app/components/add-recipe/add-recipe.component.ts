import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef, NbToastrService, NbComponentStatus } from '@nebular/theme'; 
import { fadeInDownOnEnterAnimation, fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls  : ['./add-recipe.component.css'],
  animations : [
    fadeInUpOnEnterAnimation({ duration: 500 }),
    fadeInOnEnterAnimation({ delay: 200 }),
    fadeInDownOnEnterAnimation({ duration: 400 }),
    fadeOutOnLeaveAnimation() 
  ]
})
export class AddRecipeComponent implements OnInit {
  firstForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]]
  })
  secondForm: FormGroup = this.formBuilder.group({
    ingredients: this.formBuilder.array([], Validators.required)
  });
  thirdForm: FormGroup = this.formBuilder.group({
    steps: this.formBuilder.array([], Validators.required)
  });
  recipeToAdd: any = null;

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
  filesName: string[] = [];
  userLogged: any = null;
  previewImages: any = [];

  constructor(
    public windowRef: NbWindowRef,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private recipeService: RecipeService,
    private toastrService: NbToastrService ) { }

  ngOnInit(): void {
    this.onAfterAddingFile();
    this.onBuildItemForm();
  }

  addRecipe() {
    this.spinnerService.show( 'addRecipe' );
    this.uploader.uploadAll();
    const recipe = { ...this.firstForm.value, ...this.secondForm.value, ...this.thirdForm.value, image: this.filesName };
    this.recipeService.addRecipe( recipe ).subscribe();
    setTimeout(() => {
      this.spinnerService.hide( 'addRecipe' );
      this.windowRef.close();
    }, 2000);
  }

  //Subir Imágenes
  onAfterAddingFile() {
    this.uploader.onAfterAddingFile = ( item: FileItem ) => {
      const filename = `${this.userLogged._id}${item.file.size}`;
      this.filesName.push( filename );
      const reader = new FileReader();

      reader.onload = () => {
        this.previewImages.push({
          path: reader.result as string,
          id: filename,
          name: item.file.name,
          size: (item.file.size/1024)/1024
        });
      };
      reader.readAsDataURL( item._file );
    }
  }

  onBuildItemForm() {
    this.uploader.onBuildItemForm = ( fileItem: any, form: FormData ) => {
      const filename = `${this.userLogged._id}${fileItem.file.size}`
      form.append('public_id', filename);
      form.append( 'file', fileItem );
      form.append( 'upload_preset', 'recipeImage' );
      fileItem.withCredentials = false;
      return { fileItem, form };
    }
  }

  deleteFile( index: number ) {
    this.previewImages.splice( index, 1 );
    this.uploader.queue[index].remove();
  }

  getFormStatus(input: string, form: FormGroup) {
    if (form.get(input)?.invalid && this.firstForm.get(input)?.touched) return 'danger';

    return 'basic';
  }

  //Ingredientes
  getIngredientFormStatus(input: string, index: number) {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    const formGroup = formArray.controls[index] as FormGroup;
    if (formGroup.get(input)?.invalid && formGroup.get(input)?.touched) return 'danger';

    return 'basic';
  }

  createIngredient() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', Validators.required]
    });
  }

  addIngredient() {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    if (formArray.controls.length === 0) return formArray.push(this.createIngredient());

    const lastFormGroup = formArray.controls[formArray.controls.length - 1] as FormGroup;
    if (lastFormGroup.valid) formArray.push(this.createIngredient())
    else this.secondForm.markAllAsTouched();
  }

  deleteIngredient(index: number) {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    formArray.removeAt(index)
  }

  getIngredients() {
    return this.secondForm.get('ingredients') as FormArray;
  }

  //Pasos
  getStepFormStatus(index: number) {
    const formArray = this.thirdForm.get('steps') as FormArray;
    const formControl = formArray.controls[index] as FormControl;

    if (formControl?.invalid && formControl?.touched) return 'danger';

    return 'basic';
  }

  createStep() {
    return this.formBuilder.control('', Validators.required);
  }

  addStep() {
    const formArray = this.thirdForm.get('steps') as FormArray;
    if (formArray.controls.length === 0) return formArray.push(this.createStep());

    const lastFormGroup = formArray.controls[formArray.controls.length - 1] as FormGroup;
    if (lastFormGroup.valid) formArray.push(this.createStep())
    else this.thirdForm.markAllAsTouched();
  }

  deleteStep(index: number) {
    const formArray = this.thirdForm.get('steps') as FormArray;
    formArray.removeAt(index)
  }

  getSteps() {
    return this.thirdForm.get('steps') as FormArray;
  }

  showToastPublicacions(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      'felicidades ',
      `Se ha publicado tu receta`,
      { duration, status });
  }

}
