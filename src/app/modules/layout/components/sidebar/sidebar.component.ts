import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user.service';
import { PasswordService } from '../../../../shared/services/password.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  user$: Observable<User | null>;
  showPasswordFormFlag: Observable<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {
    this.user$ = this.userService.user$;
    this.showPasswordFormFlag = passwordService.showPasswordFormFlag;
  }

  realizarPesquisa($event: any) {
    console.log($event.target.value);
  }

  toggleNewPasswordForm() {
    this.passwordService.togglePasswordFormFlag();
  }
}
