import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = !!(form && form.submitted);
      const controlTouched = !!(control && (control.dirty || control.touched));
      const controlInvalid = !!(control && control.invalid);
      const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

      return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}