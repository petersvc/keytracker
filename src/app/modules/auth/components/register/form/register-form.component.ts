import { Component } from '@angular/core';
import { FirestoreUserService } from 'src/app/shared/services/firestore-user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  constructor(
    private readonly userService: FirestoreUserService,
    private readonly authService: AuthService
  ) {}

  register(name: string, username: string, masterPassword: string): void {
    const data = { id: '', name, username, email: '', masterPassword };
    this.userService.create(data);
    console.log('autenticando usuário...');
    this.authService.login(username, masterPassword);
  }
}
