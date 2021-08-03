import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  fieldsMatch( controlName: string, matchName: string ) {
    return ( controls: AbstractControl ) => {
      const control = controls.get(controlName);
      const match = controls.get(matchName);

      if( control?.value !== match?.value && match!.value.length > 0 ) {
        match?.setErrors({ match: true });
        return ({ match: true })
      }
      else return null;

    }
  };

}