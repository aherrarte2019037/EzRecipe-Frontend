import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbWindowRef } from '@nebular/theme';
import { fadeInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  animations: [ fadeInUpOnEnterAnimation({ duration: 500 }) ]
})
export class AddRecipeComponent implements OnInit {
  firstForm: FormGroup = this.formBuilder.group({
    name       : ['', [Validators.required, Validators.minLength(3)]],
    category   : ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]]
  })

  secondForm: FormGroup = this.formBuilder.group({
    ingredients: new FormArray([])
  });

  third: FormGroup = this.formBuilder.group({
    steps: new FormArray([])
  });
  recipeToAdd: any = null;

  constructor( public windowRef: NbWindowRef, private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
  }
  
  formCompleted() {
    if( this.firstForm.invalid && this.secondForm.invalid ) return;
  }
  
  getFormStatus( input: string, form: FormGroup ) {
    if( form.get( input )?.invalid && this.firstForm.get( input )?.touched ) return 'danger';

    return 'basic';
  }

  getIngredientFormStatus( input: string, index: number ) {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    const formGroup = formArray.controls[ index ] as FormGroup;
    if( formGroup.get( input )?.invalid && formGroup.get( input )?.touched ) return 'danger';

    return 'basic';
  }

  createIngredient() {
    return this.formBuilder.group({
      name    : ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', Validators.required]
    });
  }

  addIngredient() {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    if( formArray.controls.length === 0 ) return formArray.push( this.createIngredient() );

    const lastFormGroup = formArray.controls[formArray.controls.length - 1] as FormGroup;
    if( lastFormGroup.valid ) formArray.push( this.createIngredient() );    
  }

  deleteIngredient( index: number ) {
    const formArray = this.secondForm.get('ingredients') as FormArray;
    formArray.removeAt( index )
  }

  getIngredients() {
    return this.secondForm.get('ingredients') as FormArray;
  }


}
