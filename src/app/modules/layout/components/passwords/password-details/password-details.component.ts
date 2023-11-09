import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Observable } from 'rxjs';
import { Password } from '../../../../../shared/models/password';

@Component({
  selector: 'app-password-details',
  templateUrl: './password-details.component.html',
  styleUrls: ['./password-details.component.scss']
})
export class PasswordDetailsComponent {
  selectedPassword$!: Observable<Password | null>;
  show = false;
  editing = false;

  constructor(private readonly passwordService: PasswordService) {
    this.selectedPassword$ = this.passwordService.selectedPassword$;
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
  }
}

// 'show ? password$.passphrase : "*******"'
