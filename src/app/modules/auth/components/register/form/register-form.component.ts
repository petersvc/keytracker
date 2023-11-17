import { Component } from '@angular/core';
import { UserService } from '../../../../../shared/services/user.service';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  register(name: string, username: string, masterPassword: string): void {
    this.userService.createUser(name, username, masterPassword);
    console.log('autenticando usuário...');
    this.authService.login(username, masterPassword);
  }
}
