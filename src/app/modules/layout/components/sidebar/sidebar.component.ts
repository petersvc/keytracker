import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../shared/models/UserService';
import { PasswordService } from '../../../../shared/models/PasswordService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  user$: BehaviorSubject<User>;
  showPasswordFormFlag: Observable<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {
    this.user$ = this.userService.user;
    this.showPasswordFormFlag = passwordService.showPasswordFormFlag;
  }

  toggleNewPasswordForm() {
    this.passwordService.togglePasswordFormFlag();
  }
}
