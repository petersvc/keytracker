import { Component } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-auth-register-form',
  templateUrl: './auth-register-form.component.html',
  styleUrls: ['./auth-register-form.component.scss']
})
export class AuthRegisterFormComponent {
  constructor(private readonly userService: UserService) {}

  register(id: string, name: string, masterPassword: string): void {
    this.userService.createUser(id, name, masterPassword);
  }
}
