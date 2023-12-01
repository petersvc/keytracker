import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from '../../../../../shared/models/UserService';

@Component({
  selector: 'app-passwords-header',
  templateUrl: './passwords-header.component.html',
  styleUrls: ['./passwords-header.component.scss']
})
export class PasswordsHeaderComponent {
  user$: BehaviorSubject<User>;
  themeOptions = ['light_mode', 'dark_mode'];
  selectedThemeOption = 'dark_mode';

  constructor(private readonly userService: UserService) {
    this.user$ = this.userService.user;
    console.log(this.selectedThemeOption);
  }

  onThemeOptionChange(theme: string) {}
}
