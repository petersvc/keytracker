import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss']
})
export class NewPasswordFormComponent {
  showPasswordFormFlag: Observable<boolean>;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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
    passphrase: string,
    website: string,
    tags: string[],
    notes: string
  ) {
    const userId = this.passwordService.passwords.getValue()[0].userId;
    const newPassword = {
      id: '',
      userId,
      application,
      favorite: false,
      username,
      passphrase,
      website,
      tags,
      notes,
      inBin: false,
      createdAt: String(new Date()),
      iconName: ''
    };
    this.passwordService.create(newPassword);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput.clear();
  }

  removeTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}
