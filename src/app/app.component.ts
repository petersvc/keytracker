import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: Observable<User | null>;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.authService.login('teste1', 'senha1');
    this.user = this.userService.user$;
  }
}
