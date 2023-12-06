import { Component } from '@angular/core';
import { Password } from 'src/app/shared/interfaces/password';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BehaviorSubject } from 'rxjs';

// import * as passwords from 'src/passwordsjson';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss']
})
export class PasswordsComponent {
  passwords$: BehaviorSubject<Password[]>;
  displayedColumns: string[] = [
    'favorite',
    'application',
    'username',
    'passphrase',
    'tags',
    'actions'
  ];
  readonly icons = fab;

  constructor(private readonly passwordService: PasswordService) {
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

  expandActions(elementClass: string, actions: HTMLElement) {
    const element = document.querySelector(elementClass) as HTMLElement;
    const actionsCoordinates = this.getBoundingBoxCoordinates(actions);
    if (element.clientHeight === 0) {
      element.style.top = `${actionsCoordinates.top + actionsCoordinates.height + 5}px`;
      element.style.left = `${actionsCoordinates.left - actionsCoordinates.width * 6 + 5}px`;
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  }

  savePassword() {
    // passwords.passwords.passwords.forEach(password => {
    //   this.passwordService.create(password);
    // });
  }
}
