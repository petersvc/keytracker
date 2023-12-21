import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Password } from 'src/app/shared/interfaces/password';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeService } from '../../../../shared/services/font-awesome.service';
import { UserService } from '../../../../shared/models/UserService';
import { PasswordPostDTO } from '../../../../shared/interfaces/passwordPostDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordUpdateDTO } from '../../../../shared/interfaces/passwordUpdateDTO';
import { FeedbackService } from '../../../../shared/services/feedback.service';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss']
})
export class PasswordManagementComponent {
  password$ = new BehaviorSubject<Password>({} as Password);
  isLoading = true;
  routePasswordId!: string | null;
  isPasswordVisible = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  temporaryTags: string[] = [];
  favorite!: boolean;
  showFeedback!: boolean;
  lock = true;

  passwordForm = new FormGroup({
    application: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    passphrase: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/)
    ]),
    website: new FormControl('', Validators.required),
    tags: new FormControl([]),
    notes: new FormControl('')
  });

  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    public readonly fontAwesomeService: FontAwesomeService,
    private readonly activeRoute: ActivatedRoute,
    private readonly feedbackService: FeedbackService
  ) {
    this.start();
  }

  start(): void {
    this.routePasswordId = this.activeRoute.snapshot.paramMap.get('id');
    this.passwordForm.disable();
    let passwordToSubscribe: Observable<Password | PasswordPostDTO>;
    if (this.routePasswordId) {
      if (this.routePasswordId == 'Criar senha') {
        passwordToSubscribe = new Observable<PasswordPostDTO>(subscriber => {
          const newPassword: PasswordPostDTO = {
            userId: this.userService.user.getValue().id,
            application: this.routePasswordId as string,
            favorite: false,
            username: '',
            passphrase: '',
            website: '',
            tags: [],
            notes: '',
            inBin: false,
            createdAt: ''
          };
          this.passwordForm.enable();
          subscriber.next(newPassword);
        });
      } else {
        passwordToSubscribe = this.passwordService.readOne(Number(this.routePasswordId));
      }

      passwordToSubscribe.subscribe(password => {
        this.password$.next(password as Password);
        if (this.routePasswordId === 'Criar senha') {
          this.lock = false;
          this.isPasswordVisible = true;
        } else {
          this.lock = true;
          this.isPasswordVisible = false;
        }
        this.generateTemporaryTags();
        this.favorite = password.favorite;
        this.showFeedback = false;
        this.isLoading = false;
      });
    }
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  togglePassphraseVisibility(td: HTMLInputElement, passwordId: number | null) {
    const checkPassphrase = Array.from(td.placeholder as string).some(char => char !== '*');
    if (checkPassphrase) {
      td.placeholder = '*'.repeat(8);
    } else {
      this.passwordService.getPassphrase(Number(passwordId)).subscribe(passphrase => {
        td.placeholder = passphrase;
      });
    }
  }

  copyPassword(button: HTMLButtonElement, passwordId: number | null) {
    this.passwordService.getPassphrase(Number(passwordId)).subscribe(passphrase => {
      navigator.clipboard.writeText(passphrase).then(
        () => {
          button.classList.add('active');
          setTimeout(() => {
            button.classList.remove('active');
          }, 1000);
        },
        err => console.error('Erro ao copiar texto: ', err)
      );
    });
  }

  deletePassword(id: number | null) {
    if (id) this.passwordService.delete(id);
  }

  updateOrSavePassword() {
    if (this.passwordForm.invalid) {
      console.error('Formulário inválido');
      this.feedbackService.errorMessage(`Formulário inválido`);
      return;
    }
    // Verifica se a senha é nova ou se é uma senha já existent
    const oldPassword = this.password$.getValue();
    const { application, username, passphrase, website, tags, notes } = this.passwordForm.value;

    if (oldPassword.id === undefined) {
      const newPass: PasswordPostDTO = {
        userId: this.userService.user.getValue().id,
        application,
        username,
        passphrase,
        website,
        tags,
        favorite: false,
        notes,
        inBin: false,
        createdAt: ''
      } as PasswordPostDTO;
      this.passwordService.create(newPass);
      this.passwordForm.reset();
    } else {
      this.passwordService.getPassphrase(Number(oldPassword.id)).subscribe(oldPassphrase => {
        const validPassphrase = (passphrase as string).length > 0 ? passphrase : oldPassphrase;
        console.log('notes: ', notes);

        const updatedPassword = {
          ...oldPassword,
          application: application !== '' ? (application as string) : oldPassword.application,
          username: username !== '' ? (username as string) : oldPassword.username,
          passphrase: validPassphrase as string,
          website: website !== '' ? (website as string) : oldPassword.website,
          tags: (tags as string[]).length > 0 ? (tags as string[]) : oldPassword.tags,
          favorite: false,
          notes: notes !== '' ? (notes as string) : oldPassword.notes,
          inBin: false,
          createdAt: ''
        } as PasswordUpdateDTO;
        this.passwordService.update(updatedPassword);
      });
    }

    this.lock = true;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.temporaryTags.push(value);
      const form = this.passwordForm.controls.tags as FormControl;
      form.setValue(this.temporaryTags);
    }

    event.chipInput.clear();
  }

  removeTag(tag: string) {
    this.temporaryTags.splice(this.temporaryTags.indexOf(tag), 1);
    const form = this.passwordForm.controls.tags as FormControl;
    form.setValue(this.temporaryTags);
  }

  generateTemporaryTags() {
    this.temporaryTags = [...this.password$.getValue().tags];
  }

  toggleLock() {
    this.lock = !this.lock;
    if (this.passwordForm.disabled) {
      this.passwordForm.enable();

      const passwordData = this.password$.getValue();

      this.passwordService.getPassphrase(Number(passwordData.id)).subscribe(passphrase => {
        this.passwordForm.patchValue({
          application: passwordData.application || '',
          username: passwordData.username || '',
          passphrase: passphrase || '',
          website: passwordData.website || ''
        });
      });
    } else {
      this.passwordForm.disable();
    }
  }

  get application() {
    return this.passwordForm.get('application');
  }

  get username() {
    return this.passwordForm.get('username');
  }

  get passphrase() {
    return this.passwordForm.get('passphrase');
  }
}
