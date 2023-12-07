import { Component } from '@angular/core';
import { Password } from 'src/app/shared/interfaces/password';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeService } from 'src/app/shared/services/font-awesome.service';
import { ActivatedRoute } from '@angular/router';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  isLoading = true;
  passwords$ = new BehaviorSubject<Password[]>([] as Password[]);
  passwordId: number | null = null;
  displayedColumns: string[] = [
    'favorite',
    'application',
    'username',
    'passphrase',
    'tags',
    'actions'
  ];
  headerTitle = 'Senhas';
  passwordsLength = 0;

  constructor(
    private readonly passwordService: PasswordService,
    public readonly fontAwesomeService: FontAwesomeService,
    private readonly activeRoute: ActivatedRoute
  ) {
    const headerTitlesStrategy = {
      favorite: 'Favoritas',
      inBin: 'Lixeira'
    };

    this.activeRoute.params.subscribe(params => {
      const property = params['query'] as keyof Password;
      if (property && (property as string) !== '') {
        if (headerTitlesStrategy[property as keyof typeof headerTitlesStrategy]) {
          const filteredPasswords = this.passwordService.passwords
            .getValue()
            .filter(password => password[property]);
          this.passwords$.next(filteredPasswords);
          this.headerTitle = headerTitlesStrategy[property as keyof typeof headerTitlesStrategy];
          this.passwordsLength = filteredPasswords.length;
        } else {
          const tagToSearch = property.toLowerCase();
          const allPasswords = this.passwordService.passwords.getValue();
          const filteredPasswords = allPasswords.filter(password =>
            password.tags.some(tag => tag.toLowerCase().includes(tagToSearch))
          );
          this.passwords$.next(filteredPasswords);
          this.headerTitle = 'Tag: ' + property;
          this.passwordsLength = filteredPasswords.length;
        }
      } else {
        this.passwords$.next(this.passwordService.passwords.getValue());
        this.passwordsLength = this.passwords$.getValue().length;
      }
      this.isLoading = false;
    });
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
