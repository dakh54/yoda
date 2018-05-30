import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './auth/login.component';
import { UserListComponent } from './users/user-list/user-list.component';




export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'users/list', component: UserListComponent
          }
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
      // { path: 'users',
      //   component: HomeLayoutComponent,
      //   //canActivate: [AuthGuard],
      //   children: [
      //     { path: 'list', component: UserListComponent }
      //   ]
      // },
      { path: '**', redirectTo: '' }
    
]