import { Component } from '@angular/core';
import { Password } from '../../../../../shared/models/password';
import { Observable } from 'rxjs';
import { PasswordService } from '../../../../../shared/services/password.service';

@Component({
  selector: 'app-passwords-list',
  templateUrl: './passwords-list.component.html',
  styleUrls: ['./passwords-list.component.scss']
})
export class PasswordsListComponent {
  passwords$!: Observable<Password[] | null>;
  selectedPassword$: Observable<Password | null>;
  sortOptions = ['A-Z', 'Recente', 'Antigo'];
  selectedSortOption = 'A-Z';

  constructor(private readonly passwordService: PasswordService) {
    this.passwords$ = this.passwordService.passwords$;
    // this.passwords$.subscribe(passwords => {
    //   const firstPassword = passwords ? passwords[0] : null;
    //   this.selectPassword(firstPassword as Password);
    // });
    this.passwordService.setFirstSelectedPassword();
    this.selectedPassword$ = this.passwordService.selectedPassword$;
  }

  onSortOptionChange(option: string) {
    this.selectedSortOption = option;
  }

  selectPassword(password: Password) {
    this.passwordService.selectedPassword$ = password;
  }
}
//  || i === 0 && (selectedPassword$ | async) === null
