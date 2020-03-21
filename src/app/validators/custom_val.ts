import { AbstractControl } from '@angular/forms';

// Validator if it is today or past
export function ValidateDate(control: AbstractControl) {
  if (new Date() > new Date(control.value) || new Date(2029, 11, 31) < new Date(control.value)) {
    return { ValidateDate: true };
  }
  return false;
}


