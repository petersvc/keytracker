import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthPreviewComponent } from './auth-preview/auth-preview.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginFormComponent } from './auth-login/auth-login-form/auth-login-form.component';
import { AuthRegisterFormComponent } from './auth-register/auth-register-form/auth-register-form.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthPreviewComponent,
    AuthRegisterComponent,
    AuthLoginFormComponent,
    AuthRegisterFormComponent
  ],
  exports: [],
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink]
})
export class AuthModule {}
