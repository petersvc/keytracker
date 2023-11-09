import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss']
})
export class NewPasswordFormComponent {
  showPasswordFormFlag: Observable<boolean>;

  constructor(private readonly passwordService: PasswordService) {
    this.showPasswordFormFlag = passwordService.showPasswordFormFlag;
  }
  toggleNewPasswordForm() {
    this.passwordService.togglePasswordFormFlag();
  }

  toggleShowPassword() {}

  createPassword(
    application: string,
    username: string,
    password: string,
    website: string,
    notes: string
  ) {
    let userId = '';
    this.passwordService.selectedPassword$.subscribe(
      password => (userId = password?.userId as string)
    );
    this.passwordService.createPassword(application, username, password, website, notes, userId);
  }
}
