import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordService } from 'src/app/shared/models/PasswordService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showPasswordFormFlag: Observable<boolean>;

  constructor(private readonly passwordService: PasswordService) {
    this.showPasswordFormFlag = passwordService.showPasswordFormFlag;
  }

  toggleNewPasswordForm() {
    this.passwordService.togglePasswordFormFlag();
  }
}
