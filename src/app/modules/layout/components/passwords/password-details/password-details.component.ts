import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Password } from 'src/app/shared/interfaces/password';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { environment } from 'src/environments/environment';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.scss']
})
export class PasswordDetailsComponent {
  password$ = new BehaviorSubject<Password>({} as Password);
  isPasswordVisible = false;
  editing = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  temporaryTags: string[] = [];
  favorite!: boolean;
  showFeedback!: boolean;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly feedbackService: FeedbackService
  ) {
    this.start();
  }

  start(): void {
    this.passwordService.selectedPassword.subscribe(password => {
      this.isPasswordVisible = false;
      this.editing = false;
      this.password$.next(password);
      this.generateTemporaryTags();
      this.favorite = password.favorite;
      this.showFeedback = false;
    });
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  toggleShow() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleEdit() {
    this.editing = !this.editing;
    // passwords.passwords.passwords.forEach(password => {
    //   this.passwordService.create(password);
    // });
  }

  copyPassword(button: HTMLButtonElement) {
    navigator.clipboard.writeText(this.password$.getValue().passphrase).then(
      () => {
        console.log('Texto copiado com sucesso!');
        button.classList.add('active');
        setTimeout(() => {
          button.classList.remove('active');
        }, 1000);
      },
      err => console.error('Erro ao copiar texto: ', err)
    );
  }

  deletePassword(id: string) {
    this.passwordService.delete(id);
  }

  updatePassword(
    oldPassword: Password,
    application: string,
    username: string,
    passphrase: string,
    website: string,
    tags: string[],
    favorite: boolean,
    notes: string
  ) {
    const updatedPassword = {
      ...oldPassword,
      application,
      username,
      passphrase,
      website,
      tags,
      favorite,
      notes
    };
    if (environment.useFirestore) {
      this.passwordService.update(updatedPassword);
    } else {
      this.passwordService.update(oldPassword, updatedPassword);
    }

    this.editing = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.temporaryTags.push(value);
    }

    event.chipInput.clear();
  }

  removeTag(tag: string) {
    this.temporaryTags.splice(this.temporaryTags.indexOf(tag), 1);
  }

  generateTemporaryTags() {
    this.temporaryTags = [...this.password$.getValue().tags];
  }
}
