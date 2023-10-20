import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss']
})
export class AuthLoginFormComponent {
  constructor(private readonly authService: AuthService) {}

  login(username: string, masterPassword: string): void {
    this.authService.login(username, masterPassword);
  }
}
