import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/auth.guard';
import { AuthPreviewComponent } from './modules/auth/auth-preview/auth-preview.component';
import { AuthLoginComponent } from './modules/auth/auth-login/auth-login.component';
import { AuthRegisterComponent } from './modules/auth/auth-register/auth-register.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: 'register',
    component: AuthRegisterComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
