import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { fadeInDownOnEnterAnimation, fadeInUpOnEnterAnimation } from 'angular-animations';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  animations: [fadeInUpOnEnterAnimation({ duration: 500 }), fadeInDownOnEnterAnimation({ duration: 300 })]
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
  loadingUpload: boolean = false;
  filesName: string[] = [];

  constructor (
    public windowRef: NbWindowRef, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = ( item: FileItem ) => {
      this.filesName.push( item.file.name );
      console.log(this.filesName)
    }
    this.uploader.onBuildItemForm = ( fileItem: any, form: FormData ) => {
      form.append( 'file', fileItem );
      form.append( 'upload_preset', 'recipeImagesss' );
      fileItem.withCredentials = false;
      return { fileItem, form };
    }
  }

  upload() {
  }

  formCompleted() {
    if (this.firstForm.invalid && this.secondForm.invalid) return;
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

}
