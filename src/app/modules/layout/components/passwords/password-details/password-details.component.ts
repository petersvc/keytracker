import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Password } from '../../../../../shared/models/password';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.scss']
})
export class PasswordDetailsComponent {
  password$!: Observable<Password>;
  show = false;
  editing = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  temporaryTags: string[] = [];
  favorite!: boolean;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly currentRoute: ActivatedRoute
  ) {
    this.start();
  }

  start(): void {
    this.currentRoute.paramMap.subscribe(params => {
      const passwordId = params.get('id');
      if (passwordId) {
        this.password$ = this.passwordService.getPasswordById(passwordId);
        this.editing = false;
        this.generateTemporaryTags();
        this.password$.subscribe(password => {
          this.favorite = password.favorite;
        });
      }
    });
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  toggleShow() {
    this.show = !this.show;
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
    application: string,
    username: string,
    password: string,
    website: string,
    tags: string[],
    favorite: boolean,
    notes: string
  ) {
    this.passwordService.updatePassword(
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
    this.password$.subscribe(password => {
      this.temporaryTags = [...password.tags];
    });
  }
}
