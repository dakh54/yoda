import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher';
import { BranchService } from '../../branches/branch.service';
import { Ibranch, Irole } from '../../models/index-models';
import { Router } from '@angular/router';
import { RoleService } from '../../roles/role.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { CustomValidator } from '../../shared/custom-validator';
import { take, map, debounceTime, tap } from 'rxjs/operators';



function isExistedEmail(afs: AngularFirestore): ValidatorFn {
return (c: FormControl) => {
  let email = c.value.toLocaleLowerCase();
 
  // c.valueChanges.subscribe(
    
  //   val => console.log('val',val)
  // )
    
  

  // c.valueChanges().pipe(
  //   debounceTime(500),
  //   tap(email => console.log('email----', email))
  // )
  
  //return { exist: email };
  
  return afs.collection('employees', ref => ref.where('email', '==', email)).valueChanges()
    .pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length > 0 ? { exist : true }: null )
    )
   }
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
          Validators.email,
          isExistedEmail(this.afs)
        ]]
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

      this.userService.addNewEmployee(employee).then(
        success => {
          console.log('User added', success);
          this.userService.getEmployee(employee.email).subscribe(
            emp => console.log('employee-createe', emp)
          )
        },
        err => console.log('Failed to create new user', err)
      )
      // if (this.newEmployeeForm.valid) {
        //   this.auth.createUser(employee.email, this.newEmployeeForm.get('passwordGroup.password').value).then(
          //     data => console.log('user-created-data', data)
          //   ).catch(
            //     err => console.log('Failed to create new user', err)
            //   )
            // }
            console.log('employee', employee);
            console.log('----------------------------------------------');
          }
        }
        
      }
        
        // export class CustomValidator {
          //   static uniqueEmployeeEmail(afs: AngularFirestore) {
            //       return (c: AbstractControl) => {
              //           const email = c.value.toLocaleLowerCase();
//           console.log('email', email);
//           return afs.collection('employees', ref => ref.where('email', '==', email))
//               .valueChanges().pipe(
//                   //debounceTime(500),
//                   // take(1),
//                   map(arr => { 
//                       console.log('arr', arr);
//                       arr.length ? { exist : true } : null;
                      
//                   }
//                   )
//               )
//       }
//   }


//}