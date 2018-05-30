import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { UserListComponent } from './users/user-list/user-list.component';


export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'users', loadChildren: './users/user.module#UserModule' },
    // { path: 'users', component: UserListComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
]