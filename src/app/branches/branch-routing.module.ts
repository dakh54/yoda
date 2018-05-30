import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchNewComponent } from './branch-new/branch-new.component';

const routes: Routes = [
  { path: ':id/edit', component: BranchEditComponent },
  { path: 'list', component: BranchListComponent },
  { path: 'new', component: BranchNewComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
