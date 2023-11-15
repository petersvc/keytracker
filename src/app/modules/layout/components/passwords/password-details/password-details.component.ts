import { Component, inject } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Password } from '../../../../../shared/models/password';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.scss']
})
export class PasswordDetailsComponent {
  password!: Password | undefined;
  show = false;
  editing = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  toRemoveTags = new Set<string>();

  constructor(
    private readonly passwordService: PasswordService,
    private readonly currentRoute: ActivatedRoute
  ) {
    this.getPassword();
  }

  getPassword(): void {
    this.currentRoute.paramMap.subscribe(params => {
      const passwordId = params.get('id');
      if (passwordId) {
        this.password = this.passwordService.getPasswordById(passwordId);
      }
    });
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
    notes: string
  ) {
    this.passwordService.updatePassword(application, username, password, website, notes);
    this.editing = false;
  }

  announcer = inject(LiveAnnouncer);

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //
  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push({ name: value });
  //   }
  //
  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  remove(tag: string): void {
    this.passwordService.removeTag(this.password as Password, tag);
    this.password?.tags.splice(this.password?.tags.indexOf(tag), 1);
  }

  selectTagToRemove(tag: string) {
    if (this.toRemoveTags.has(tag)) {
      this.toRemoveTags.delete(tag);
    } else {
      this.toRemoveTags.add(tag);
    }
    console.log(this.toRemoveTags);
  }
}

// 'show ? password$.passphrase : "*******"'
