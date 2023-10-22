import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { CoreComponent } from './modules/layout/components/core/core.component';

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
    component: CoreComponent
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: CoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
