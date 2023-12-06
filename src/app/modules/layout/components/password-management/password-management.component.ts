import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Password } from 'src/app/shared/interfaces/password';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
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
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  temporaryTags: string[] = [];
  favorite!: boolean;
  showFeedback!: boolean;
  lock = true;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.start();
  }

  start(): void {
    const passwordId = this.activeRoute.snapshot.paramMap.get('id');
    let passwordToSubscribe: Observable<Password>;
    if (passwordId) {
      if (passwordId == 'Nova senha') {
        passwordToSubscribe = new Observable<Password>(subscriber => {
          const newPassword: Password = {
            id: null,
            userId: this.passwordService.passwords.getValue()[0].userId,
            application: passwordId,
            favorite: false,
            username: '',
            passphrase: '',
            website: '',
            tags: [],
            notes: '',
            inBin: false,
            createdAt: '',
            iconName: ''
          };
          subscriber.next(newPassword);
        });
      } else {
        passwordToSubscribe = this.passwordService.readOne(Number(passwordId));
      }

      passwordToSubscribe.subscribe(password => {
        this.password$.next(password);
        if (passwordId === 'Nova senha') {
          this.lock = false;
          this.isPasswordVisible = true;
        } else {
          this.lock = true;
          this.isPasswordVisible = false;
        }
        this.generateTemporaryTags();
        this.favorite = password.favorite;
        this.showFeedback = false;
      });
    }
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  toggleShow() {
    this.isPasswordVisible = !this.isPasswordVisible;
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

  deletePassword(id: number) {
    this.passwordService.delete(id);
  }

  updateOrSavePassword(
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

    // Verifica se a senha é nova
    if (updatedPassword.id === null) {
      this.passwordService.create(updatedPassword);
    } else {
      this.passwordService.update(updatedPassword);
    }

    // if (environment.SERVICE_TYPE === 'firestore') {
    //   this.passwordService.update(updatedPassword);
    // } else {
    //   this.passwordService.update(oldPassword, updatedPassword);
    // }
    //
    this.lock = true;
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
