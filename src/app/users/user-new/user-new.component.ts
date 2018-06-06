import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { BranchService } from '../../branches/branch.service';
import { Observable } from '@firebase/util';
import { Ibranch, Irole } from '../../models/index-models';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iposition } from '../../models/iposition';
import { PositionService } from '../../positions/position.service';
import { RoleService } from '../../roles/role.service';
import { AuthService } from '../../auth/auth.service';




@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  newEmployeeForm: FormGroup;
  employee: Iemployee;
  branches: Ibranch[];
  positions: Iposition[];
  roles: Irole[];

  hidePassword = true;
  hidePasswordConfirmed = true;

  matcher = new MyErrorStateMatcher();
  // parentMatcher = new ParentErrorStateMatcher();



  constructor(
    private fb: FormBuilder,
    private branchesService: BranchService,
    private router: Router,
    // private positionService: PositionService,
    private roleService: RoleService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.newEmployeeForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        // employeePosition: ['', [
        //   Validators.required,
        //   Validators.pattern('')
        // ]],
        employeeId: ['', [Validators.required]],
        nationalId: '',
        homeOffice: ['', [
          Validators.required,
          Validators.pattern('')
        ]],
        primaryPhone: '',
        secondaryPhone: '',
        roles: ['', [
          Validators.required,
          Validators.pattern('')
        ]],
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
          }, { validator: passwordMatcher })
      });

    this.getBranches();
    // this.getPositions();
    this.getRoles();

  }


  getBranches() {
    return this.branchesService.getBranches().subscribe(
      data => this.branches = data,
      error => {
        console.log('Failed to fetch home office data ', error);
        this.router.navigate(['/page-not-found']);
      }

    )
  }


  // getPositions() {
  //   return this.positionService.getPositions().subscribe(
  //     data =>  this.positions = data,
  //     error => {
  //       console.log('Failed to fetch employee position data ', error);
  //       this.router.navigate(['/page-not-found']);
  //     }

  //   )
  // }


  getRoles() {
    return this.roleService.getRoles().subscribe(
      data => this.roles = data,
      error => {
        console.log('Failed to fetch employee role data ', error);
        this.router.navigate(['/page-not-found']);
      }

    )
  }

  save() {
    console.log('----------------------------------------------');
    console.log('valid', this.newEmployeeForm.valid);
    console.log('newEmplooyeeForm', this.newEmployeeForm.value);

    let employee = Object.assign({}, this.newEmployeeForm.value);
    

    if (this.newEmployeeForm.valid) {
      this.auth.createUser(employee.email, this.newEmployeeForm.get('passwordGroup.password').value).then(
        data => console.log('user-created-data', data)
      ).catch(
        err => console.log('Failed to create new user', err)
      )
    }
    console.log('employee', employee);
    console.log('----------------------------------------------');
  }
}
