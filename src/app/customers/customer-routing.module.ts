import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';

const routes: Routes = [
  { path: 'edit/:id', component: CustomerEditComponent },
  { path: '', component: CustomerListComponent },
  { path: 'new', component: CustomerNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
