import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user.module.routing';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';



@NgModule({
  imports: [
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserNewComponent
    
  ]
})
export class UserModule { }
