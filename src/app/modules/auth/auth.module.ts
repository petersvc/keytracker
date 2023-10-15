import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRegistrationComponent } from './auth-registration/auth-registration.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AuthComponent, AuthRegistrationComponent, AuthFormComponent],
  exports: [AuthComponent],
  imports: [CommonModule, FormsModule, MatIconModule, MatInputModule]
})
export class AuthModule {}
