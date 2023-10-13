import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRegistrationComponent } from './auth-registration/auth-registration.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthRegistrationComponent,
    AuthLoginComponent
  ],
  exports: [
    AuthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
