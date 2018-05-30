import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';


const routes: Routes = [
  { path: 'users', component: UserListComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    { path: 'users/list', component: UserListComponent },
    { path: 'users/new', component: UserNewComponent }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
