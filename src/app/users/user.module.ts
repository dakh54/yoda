import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    UserRoutingModule
  ],
  declarations: [UserListComponent, UserEditComponent]
})
export class UserModule { }
