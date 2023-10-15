import { Component, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-auth-registration',
  templateUrl: './auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export class AuthRegistrationComponent {
  @Input() currentUser!: User;
  name!: string;
  username!: string;
  masterPassword!: string;

  constructor(private readonly userService: UserService) {}

  register(): void {
    this.userService
      .createUser(this.name, this.username, this.masterPassword)
      .subscribe(response => {
        console.log('Novo usuário criado:', response);
        this.currentUser = response;
      });
  }
}
