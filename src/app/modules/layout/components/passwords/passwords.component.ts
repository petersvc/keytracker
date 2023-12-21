import { Component } from '@angular/core';
import { Password } from 'src/app/shared/interfaces/password';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeService } from 'src/app/shared/services/font-awesome.service';
import { ActivatedRoute } from '@angular/router';

// import * as passwordsjson from 'src/passwordsjson';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  isLoading = true;
  showPasswordComponent = false;
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

    this.passwordService.passwords.subscribe(passwords => {
      const allPasswords = passwords;

      this.activeRoute.params.subscribe(params => {
        const property = params['filter'] as keyof Password;

        if (property && (property as string) !== '') {
          if (headerTitlesStrategy[property as keyof typeof headerTitlesStrategy]) {
            const filteredPasswords = this.passwordService.passwords
              .getValue()
              .filter(password => password[property]);
            this.passwords$.next(filteredPasswords);
            this.headerTitle = headerTitlesStrategy[property as keyof typeof headerTitlesStrategy];
          } else {
            this.filterPasswordsByTag(property, allPasswords);
          }
        } else if (params['applicationName']) {
          this.filterPasswordsByApplicationName(params['applicationName'], allPasswords);
        } else if (!params['id']) {
          this.passwords$.next(this.passwordService.passwords.getValue());
        } else {
          this.showPasswordComponent = true;
        }
        this.isLoading = false;
        this.passwordsLength = this.passwords$.getValue().length;
      });
    });
  }

  filterPasswordsByTag(tag: string, allPasswords: Password[]) {
    const tagToSearch = tag.toLowerCase();
    const filteredPasswords = allPasswords.filter(password =>
      password.tags.some(tag => tag.toLowerCase().includes(tagToSearch))
    );
    this.passwords$.next(filteredPasswords);
    this.headerTitle = 'Tag: ' + tag;
  }

  filterPasswordsByApplicationName(applicationName: string, allPasswords: Password[]) {
    const filteredPasswords = allPasswords.filter(password =>
      password.application.toLowerCase().includes(applicationName.toLowerCase())
    );
    this.passwords$.next(filteredPasswords);
  }

  togglePasswordVisibility(td: HTMLElement, passwordId: string) {
    const checkPassphrase = Array.from(td.textContent as string).some(char => char !== '*');
    if (checkPassphrase) {
      td.textContent = '*'.repeat(8); // tdValue.replace(/./g, '*');
    } else {
      this.passwordService.getPassphrase(Number(passwordId)).subscribe(passphrase => {
        td.textContent = passphrase;
      });
    }
  }

  copyUsername(button: HTMLButtonElement, username: string) {
    navigator.clipboard.writeText(username).then(
      () => {
        button.classList.add('active');
        setTimeout(() => {
          button.classList.remove('active');
        }, 1000);
      },
      err => console.error('Erro ao copiar texto: ', err)
    );
  }

  copyPassword(button: HTMLButtonElement, passwordId: string) {
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

  savePasswords() {
    // passwordsjson.passwords.forEach(password => {
    //   password.userId = <number>this.passwords$.getValue()[0].userId;
    //   this.passwordService.create(password);
    // });
  }
}
