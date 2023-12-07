import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Password } from '../../../../../shared/interfaces/password';
import { PasswordService } from '../../../../../shared/models/PasswordService';

@Component({
  selector: 'app-passwords-header',
  templateUrl: './passwords-header.component.html',
  styleUrls: ['./passwords-header.component.scss']
})
export class PasswordsHeaderComponent {
  @Input() headerTitle = '';
  @Input() passwordsLength = 0;
  passwords$: BehaviorSubject<Password[]>;
  sortOptions = ['A-Z', 'Recente', 'Antigo'];
  selectedSortOption = 'A-Z';

  constructor(private readonly passwordService: PasswordService) {
    this.passwords$ = this.passwordService.passwords;
  }

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

  search(value: string) {}
}
