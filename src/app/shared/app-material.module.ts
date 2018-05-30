import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule
 } from '@angular/material';

@NgModule({
    exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule
  ]
})
export class AppMaterialModule {}
