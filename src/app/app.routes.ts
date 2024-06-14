import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'membership',
    component: MembershipComponent,
    canActivate: [ authGuard ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
