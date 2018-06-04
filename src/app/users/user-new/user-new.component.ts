import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { MyErrorStateMatcher, ParentErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { BranchService } from '../../branches/branch.service';
import { Observable } from '@firebase/util';
import { Ibranch } from '../../models/ibranch';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

function passwordMatcher(c: AbstractControl) {
  let passwordControl = c.get('password');
  let confirmedPassword = c.get('confirmedPassword')
  if (passwordControl.pristine || confirmedPassword.pristine) {
    return null;
  }
  if(passwordControl.value === confirmedPassword.value) {
    return null;
  }
  return  { 'match': true };
}


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  newEmployeeForm: FormGroup;
  employee: Iemployee;
  branches: Ibranch[];
  
  hidePassword = true;
  hidePasswordConfirmed = true;

  matcher = new MyErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();



  constructor(
    private fb: FormBuilder, 
    private branchesService: BranchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newEmployeeForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        employeePosition: ['', [Validators.required]],
        employeeId: ['', [Validators.required]],
        nationalId: '',
        homeOffice: ['', [
          Validators.required,
          Validators.pattern(''),
        ]],
        primaryPhone: '',
        secondaryPhone: '',
        roles: '',
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        passwordGroup: this.fb.group(
          {
            password: ['', [
              Validators.required,
              Validators.minLength(8)
            ]],
            confirmedPassword: ['', [
              Validators.required
            ]]
          }, { validator: passwordMatcher } )
     });

     this.getBranches();
     
  }


  getBranches() {
    return this.branchesService.getBranches().subscribe(
      data =>  this.branches = data,
      error => {
        console.log('Faile to fetch home office data ', error);
        this.router.navigate(['/login']);
      }
      
    )
  } 



  save() {
    console.log('valid', this.newEmployeeForm.valid);
    console.log('invValid', this.newEmployeeForm.invalid);
  }
}
