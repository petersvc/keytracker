import { Component } from '@angular/core';
import { PasswordService } from '../../../../../shared/services/password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  panelOpenState = false;
  // folders: Set<string> | undefined;
  tags: Set<string> | undefined;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly router: Router
  ) {
    this.passwordService.passwords$.subscribe(passwords => {
      // this.folders = new Set(passwords?.map(password => password.folder));
      const allTags: string[] = [];

      passwords?.forEach(password => {
        password.tags.forEach(tag => {
          allTags.push(tag);
        });
      });

      this.tags = new Set(allTags?.map(tag => tag));
    });
  }

  isTheActiveRoute(route: string): boolean {
    // console.log(this.router.url === route);
    // router.url contains route

    return this.router.url.includes(route);
  }
}
