import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadEditComponent } from './lead-edit/lead-edit.component';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadNewComponent } from './lead-new/lead-new.component';

const routes: Routes = [
  { path: 'edit/:id', component: LeadEditComponent },
  { path: '', component: LeadListComponent },
  { path: 'new', component: LeadNewComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
