import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
// import { PasswordService } from './shared/services/password$.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user!: Observable<User | null>;
  selected = 'A-Z';
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.authService.login('2', 'hashedMasterPass2');
    this.user = this.userService.user$;
  }
}
