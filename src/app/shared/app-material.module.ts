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
  MatListModule,
  MatSelectModule,
  MatAutocompleteModule
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
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class AppMaterialModule {}
