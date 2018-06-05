import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { AppMaterialModule } from '../shared/app-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchService } from '../branches/branch.service';
import { PositionService } from '../positions/position.service';
import { RoleService } from '../roles/role.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
    
  ],
  providers:[
    BranchService,
    PositionService,
    RoleService
  ],
  declarations: [
    UserListComponent, 
    UserEditComponent, 
    UserNewComponent]
})
export class UserModule { }
