import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserPostDTO } from '../../../../../shared/interfaces/userPostDTO';
import { UserService } from '../../../../../shared/models/UserService';

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

  register(name: string, email: string, username: string, masterPassword: string): void {
    const data = { name, username, email, masterPassword } as UserPostDTO;
    this.userService.create(data).subscribe(() => {
      this.authService.login(username, masterPassword);
    });
  }
}
