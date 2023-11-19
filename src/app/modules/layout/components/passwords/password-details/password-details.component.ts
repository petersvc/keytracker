import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Password } from '../../../../../shared/models/password';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';

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

  constructor(private readonly passwordService: PasswordService) {
    this.start();
  }

  start(): void {
    this.passwordService.selectedPassword.subscribe(password => {
      this.isPasswordVisible = false;
      this.editing = false;
      this.password$.next(password);
      this.generateTemporaryTags();
      this.favorite = password.favorite;
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
  }

  copyPassword(senha: string) {
    navigator.clipboard.writeText(senha).then(
      () => console.log('Texto copiado com sucesso!'),
      err => console.error('Erro ao copiar texto: ', err)
    );
  }

  deletePassword(id: string) {
    this.passwordService.deletePassword(id);
  }

  updatePassword(
    id: string,
    application: string,
    username: string,
    password: string,
    website: string,
    tags: string[],
    favorite: boolean,
    notes: string
  ) {
    this.passwordService.updatePassword(
      id,
      application,
      username,
      password,
      website,
      tags,
      favorite,
      notes
    );
    this.editing = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.temporaryTags.push(value);
    }

    // Clear the input value
    event.chipInput.clear();
  }

  removeTag(tag: string) {
    this.temporaryTags.splice(this.temporaryTags.indexOf(tag), 1);
  }

  generateTemporaryTags() {
    this.temporaryTags = [...this.password$.getValue().tags];
  }
}
