import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  newEmployeeForm: FormGroup;
  employee: Iemployee;

  firstName: FormControl;
  lastName: FormControl;
  nationalId: FormControl;
  employeeId: FormControl;
  employeePosition: FormControl;
  primaryPhone: FormControl;
  secondaryPhone: FormControl;
  email: FormControl;
  homeOffice: FormControl;
  roles: FormControl;

  constructor() { }

  ngOnInit() {
    // this.newEmployeeForm = this.fb.group(
    //   {
    //     firstName: ['', [Validators.required]],
    //     lastName: ['', [Validators.required]],
    //     nationalId: ['', [Validators.required]],
    //     employeeId: ['', [Validators.required]],
    //     employeePosition: ['', [Validators.required]],
    //     primaryPhone: ['', [Validators.required]],
    //     secondaryPhone
    //     email = new FormControl('', Validators.required);
    //     homeOffice = new FormControl('', Validators.required);
    //     roles = new FormControl('', Validators.required);

    // });

    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.nationalId = new FormControl('');
    this.employeeId = new FormControl('', Validators.required);
    this.employeePosition = new FormControl('', Validators.required);
    this.primaryPhone = new FormControl('');
    this.secondaryPhone = new FormControl();
    this.email = new FormControl('', Validators.required);
    this.homeOffice = new FormControl('', Validators.required);
    this.roles = new FormControl('', Validators.required);

    this.newEmployeeForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        nationalId: this.nationalId,
        employeeId: this.employeeId,
        employeePosition: this.employeePosition,
        primaryPhone: this.primaryPhone,
        secondaryPhone: this.secondaryPhone,
        email: this.email,
        homeOffice: this.homeOffice,
        role: this.roles
      }
    );  
  }

  getError() {

  }

  save() {

  }
}
