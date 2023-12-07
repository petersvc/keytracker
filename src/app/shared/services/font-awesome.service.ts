import { Injectable } from '@angular/core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class FontAwesomeService {
  readonly icons = fab;

  findClosestIcon(applicationName: string): IconDefinition {
    let mostSimilar = 0;
    let closestIcon = '';

    for (const iconName of Object.keys(this.icons)) {
      const similarity = this.jaroSimilarity(applicationName.toLowerCase(), iconName.toLowerCase());

      if (similarity > mostSimilar) {
        mostSimilar = similarity;
        closestIcon = iconName;
      }
    }
    return this.icons[closestIcon];
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
}
