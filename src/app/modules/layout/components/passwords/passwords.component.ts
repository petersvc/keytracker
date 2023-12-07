import { Component } from '@angular/core';
import { Password } from 'src/app/shared/interfaces/password';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeService } from 'src/app/shared/services/font-awesome.service';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  passwords$: BehaviorSubject<Password[]>;
  passwordId: number | null = null;
  displayedColumns: string[] = [
    'favorite',
    'application',
    'username',
    'passphrase',
    'tags',
    'actions'
  ];

  constructor(
    private readonly passwordService: PasswordService,
    public readonly fontAwesomeService: FontAwesomeService
  ) {
    this.passwords$ = this.passwordService.passwords;
  }

  togglePasswordVisibility(td: HTMLElement, passphrase: string) {
    const tdValue = td.textContent as string;
    const checkPassphrase = Array.from(tdValue).some(char => char !== '*');
    if (checkPassphrase) {
      td.textContent = tdValue.replace(/./g, '*');
    } else {
      td.textContent = passphrase;
    }
  }

  copyPassword(button: HTMLButtonElement, passphrase: string) {
    navigator.clipboard.writeText(passphrase).then(
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

  // copyPassword(senha: string) {
  //   navigator.clipboard.writeText(senha).then(
  //     () => console.log('Texto copiado com sucesso!'),
  //     err => console.error('Erro ao copiar texto: ', err)
  //   );
  // }

  getBoundingBoxCoordinates(element: HTMLElement): {
    top: number;
    left: number;
    width: number;
    height: number;
  } {
    const boundingBox = element.getBoundingClientRect();
    return {
      top: boundingBox.top + window.scrollY,
      left: boundingBox.left + window.scrollX,
      width: boundingBox.width,
      height: boundingBox.height
    };
  }

  expandActions(elementClass: string, actions: HTMLElement, passwordId: number) {
    const element = document.querySelector(elementClass) as HTMLElement;
    const actionsCoordinates = this.getBoundingBoxCoordinates(actions);
    if (element.clientHeight === 0) {
      element.style.top = `${actionsCoordinates.top + actionsCoordinates.height + 5}px`;
      element.style.left = `${actionsCoordinates.left - actionsCoordinates.width * 6 + 5}px`;
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }

    this.passwordId = passwordId;
  }

  deletePassword(id: number | null) {
    console.log(id);
    this.passwordService.delete(id as number);
    const element = document.querySelector('.sortBy__menu2') as HTMLElement;
    element.style.display = 'none';
  }
  savePassword() {
    // passwords.passwords.passwords.forEach(password => {
    //   this.passwordService.create(password);
    // });
  }
}
