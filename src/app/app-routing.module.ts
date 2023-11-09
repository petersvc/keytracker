import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { PasswordsComponent } from './modules/layout/components/passwords/passwords.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: PasswordsComponent
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: PasswordsComponent
  },
  {
    path: 'passwords',
    canActivate: [authGuard],
    component: PasswordsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
