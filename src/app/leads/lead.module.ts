import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadNewComponent } from './lead-new/lead-new.component';
import { LeadEditComponent } from './lead-edit/lead-edit.component';
import { LeadListComponent } from './lead-list/lead-list.component';

@NgModule({
  imports: [
    CommonModule,
    LeadRoutingModule
  ],
  declarations: [LeadNewComponent, LeadEditComponent, LeadListComponent]
})
export class LeadModule { }
