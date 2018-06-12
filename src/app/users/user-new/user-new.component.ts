import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { BranchService } from '../../branches/branch.service';
import { Ibranch, Irole } from '../../models/index-models';
import { Router } from '@angular/router';
import { RoleService } from '../../roles/role.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { CustomValidator } from '../../shared/custom-validator';





@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  newEmployeeForm: FormGroup;
  employee: Iemployee;
  branches: Ibranch[];
  // positions: Iposition[];
  roles: Irole[];

  hidePassword = true;
  hidePasswordConfirmed = true;

  matcher = new MyErrorStateMatcher();
 

  constructor(
    private fb: FormBuilder,
    private branchesService: BranchService,
    private router: Router,
    // private positionService: PositionService,
    private roleService: RoleService,
    private auth: AuthService,
    private userService: UserService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.newEmployeeForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        employeeId: ['', 
        [Validators.required],
        CustomValidator.uniqueEmployeeId(this.afs)
      ],
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
          Validators.email],
          CustomValidator.uniqueEmployeeEmail(this.afs)
        ]
      });
    this.getBranches();
    // this.getPositions();
    this.getRoles();

  }

 

  get firstNameCtrl() {
    return this.newEmployeeForm.get('firstName');
  }

  get lastNameCtrl() {
    return this.newEmployeeForm.get('lastName');
  }

  get employeeIdCtrl() {
    return this.newEmployeeForm.get('employeeId');
  }

  get nationalIdCtrl() {
    return this.newEmployeeForm.get('nationalId');
  }

  get homeOfficeCtrl(){
    return this.newEmployeeForm.get('homeOffice');
  }

  get rolesCtrl(){
    return this.newEmployeeForm.get('roles');
  }

  get emailCtrl() {
    return this.newEmployeeForm.get('email');
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



    if(this.newEmployeeForm.valid) {

      // check if email already taken
        // let userByEmail$ = this.userService.getEmployeeByEmail(employee.email);

      // check if employeeId already exist
        // let usersById$ = this.userService.get

      // check if branch not exist



      // check if role not exist



      // check if nationalId already exist

      // use ForkJoin and subscribe for value

      employee.createBy = this.auth.authState.user.email;
      

      

      this.userService.addNewEmployee(employee).then(
        success => {
          console.log('User added', success);
          this.userService.updateCreatedAt(employee).catch(
            err => console.log('Failed to update employee field createAt', err)
          )

          console.log('after-emailCtr is pristine',          this.emailCtrl.pristine)

          

          console.log('after-emailCtr is pristine',          this.emailCtrl.pristine)
          
          
        },
        err => console.log('Failed to create new user', err)
      )
      this.newEmployeeForm.reset();
 
            console.log('employee', employee);
            console.log('----------------------------------------------');
          
        }
        
      }
        
}