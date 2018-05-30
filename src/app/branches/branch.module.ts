import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchNewComponent } from './branch-new/branch-new.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchListComponent } from './branch-list/branch-list.component';


@NgModule({
  imports: [
    CommonModule,
    BranchRoutingModule
  ],
  declarations: [BranchNewComponent, BranchEditComponent, BranchListComponent]
})
export class BranchModule { }
