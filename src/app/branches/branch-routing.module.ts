import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchNewComponent } from './branch-new/branch-new.component';

const routes: Routes = [
  { path: 'edit/:id', component: BranchEditComponent },
  { path: '', component: BranchListComponent },
  { path: 'new', component: BranchNewComponent }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
