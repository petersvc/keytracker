import { Component } from '@angular/core';
import { Password } from 'src/app/shared/interfaces/password';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-passwords-list',
  templateUrl: './passwords-list.component.html',
  styleUrls: ['./passwords-list.component.scss']
})
export class PasswordsListComponent {
  passwords$: BehaviorSubject<Password[]>;
  selectedPassword = new BehaviorSubject<Password>({} as Password);
  displayedColumns: string[] = [
    'favorite',
    'application',
    'username',
    'passphrase',
    'tags',
    'actions'
  ];
  readonly icons = fab;

  sortOptions = ['A-Z', 'Recente', 'Antigo'];
  selectedSortOption = 'A-Z';

  constructor(private readonly passwordService: PasswordService) {
    this.passwords$ = this.passwordService.passwords;
    this.selectedPassword = this.passwordService.selectedPassword;
  }

  onSortOptionChange(option: string) {
    this.selectedSortOption = option;
  }

  search(value: string) {}

  expandElement(
    elementClass: string,
    height: string,
    initialHeight: number,
    transitionTime: number
  ) {
    const element = document.querySelector(elementClass) as HTMLElement;

    if (element.clientHeight === initialHeight) {
      element.style.opacity = '1';
      element.style.height = height;
    } else {
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.height = '0';
      }, transitionTime);
    }
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

  findClosestIcon(applicationName: string): string {
    let mostSimilar = 0;
    let closestIcon = '';

    for (const iconName of Object.keys(this.icons)) {
      const similarity = this.jaroSimilarity(applicationName.toLowerCase(), iconName.toLowerCase());

      if (similarity > mostSimilar) {
        mostSimilar = similarity;
        closestIcon = iconName;
      }
    }
    return closestIcon;
  }

  selectPassword(password: Password, item: HTMLElement) {
    this.passwordService.selectedPassword.next(password);

    // Elements ref
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

  copyPassword(senha: string) {
    navigator.clipboard.writeText(senha).then(
      () => console.log('Texto copiado com sucesso!'),
      err => console.error('Erro ao copiar texto: ', err)
    );
  }

  jaroSimilarity(s1: string, s2: string): number {
    const lenS1 = s1.length;
    const lenS2 = s2.length;

    if (lenS1 === 0 && lenS2 === 0) {
      return 1; // Strings vazias são consideradas idênticas
    }

    const matchDistance = Math.floor(Math.max(lenS1, lenS2) / 2) - 1;

    const matches: boolean[] = Array(lenS2).fill(false);
    let matchingCharacters = 0;

    // Encontrar caracteres correspondentes
    for (let i = 0; i < lenS1; i++) {
      const start = Math.max(0, i - matchDistance);
      const end = Math.min(i + matchDistance + 1, lenS2);

      for (let j = start; j < end; j++) {
        if (!matches[j] && s1.charAt(i) === s2.charAt(j)) {
          matches[j] = true;
          matchingCharacters++;
          break;
        }
      }
    }

    if (matchingCharacters === 0) {
      return 0; // Nenhum caractere correspondente
    }

    // Contar transposições
    let transpositions = 0;
    let k = 0;

    for (let i = 0; i < lenS1; i++) {
      if (matches[k]) {
        while (!matches[k]) k++;
        if (s1.charAt(i) !== s2.charAt(k)) transpositions++;
        k++;
      }
    }

    // Calcular similaridade de Jaro
    return (
      (matchingCharacters / lenS1 +
        matchingCharacters / lenS2 +
        (matchingCharacters - transpositions) / matchingCharacters) /
      3
    );
  }

  toggleMenu() {}
  expandActions(
    elementClass: string,
    height: string,
    initialHeight: number,
    transitionTime: number,
    actions: HTMLElement
  ) {
    const element = document.querySelector(elementClass) as HTMLElement;
    const actionsCoordinates = this.getBoundingBoxCoordinates(actions);

    if (element.clientHeight === initialHeight) {
      element.style.top = `${actionsCoordinates.top + actionsCoordinates.height + 5}px`;
      element.style.left = `${actionsCoordinates.left - actionsCoordinates.width * 6 + 5}px`;
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.height = height;
      }, transitionTime);
    } else {
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.height = '0';
      }, transitionTime);
    }
  }
}
