import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  panelOpenState = false;
  folders: Set<string> | undefined;
  tags: Set<string> | undefined;

  constructor(private readonly passwordService: PasswordService) {
    this.passwordService.passwords$.subscribe(passwords => {
      this.folders = new Set(passwords?.map(password => password.folder));
      this.tags = new Set(passwords?.flatMap(password => password.tags));
    });
  }
}
