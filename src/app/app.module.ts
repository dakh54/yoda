import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.module.routing';
import { AuthComponent } from './auth/auth.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CoreModule } from './auth/core.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
