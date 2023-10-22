import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PreviewComponent } from './components/preview/preview.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginFormComponent } from './components/login/form/login-form.component';
import { RegisterFormComponent } from './components/register/form/register-form.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    PreviewComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  exports: [],
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink]
})
export class AuthModule {}
