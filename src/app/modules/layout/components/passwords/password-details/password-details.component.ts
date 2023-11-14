import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Password } from '../../../../../shared/models/password';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.scss']
})
export class PasswordDetailsComponent {
  password$!: Password | undefined;
  show = false;
  editing = false;

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
        this.password$ = this.passwordService.getPasswordById(passwordId);
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
}

// 'show ? password$.passphrase : "*******"'
