import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Password } from 'src/app/shared/interfaces/password';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss']
})
export class PasswordManagementComponent {
  password$ = new BehaviorSubject<Password>({} as Password);
  isPasswordVisible = false;
  editing = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  temporaryTags: string[] = [];
  favorite!: boolean;
  showFeedback!: boolean;
  lock = true;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly feedbackService: FeedbackService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.start();
  }

  start(): void {
    const passwordId = this.activeRoute.snapshot.paramMap.get('id');
    console.log('passwordId: ', passwordId);
    if (passwordId) {
      this.passwordService.readOne(passwordId).subscribe(password => {
        console.log('to no if');
        console.log(password);
        this.password$.next(password);
        this.isPasswordVisible = false;
        this.editing = false;
        this.generateTemporaryTags();
        this.favorite = password.favorite;
        this.showFeedback = false;
        this.lock = true;
      });
    }
    // this.passwordService.selectedPassword.subscribe(password => {});
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
    const checkPassphrase = Array.from(passphrase).some(char => char !== '*');

    if (!checkPassphrase) {
      passphrase = oldPassword.passphrase;
    }

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

    console.log('updatedPassword: ', updatedPassword);

    // if (environment.SERVICE_TYPE === 'firestore') {
    //   this.passwordService.update(updatedPassword);
    // } else {
    //   this.passwordService.update(oldPassword, updatedPassword);
    // }
    //
    // this.editing = false;
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

  toggleLock() {
    this.lock = !this.lock;
  }
}
