import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';



const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      { path: 'users', loadChildren: './users/user.module#UserModule' },
      { path: 'branches', loadChildren: './branches/branch.module#BranchModule'}
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
