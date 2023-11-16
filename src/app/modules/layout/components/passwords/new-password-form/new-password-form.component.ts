import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
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
    password: string,
    website: string,
    tags: string[],
    notes: string
  ) {
    let userId = '';
    this.passwordService.selectedPassword$.subscribe(
      password => (userId = password?.userId as string)
    );
    this.passwordService.createPassword(
      application,
      username,
      password,
      website,
      tags,
      notes,
      userId
    );
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
