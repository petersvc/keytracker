import { Component } from '@angular/core';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  constructor(private readonly userService: UserService) {}

  register(id: string, name: string, masterPassword: string): void {
    this.userService.createUser(id, name, masterPassword);
  }
}
