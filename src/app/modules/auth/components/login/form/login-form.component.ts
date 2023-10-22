import { Component } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private readonly authService: AuthService) {}

  login(username: string, masterPassword: string): void {
    this.authService.login(username, masterPassword);
  }
}
