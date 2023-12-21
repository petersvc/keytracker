import { Component } from '@angular/core';
import { PasswordService } from 'src/app/shared/models/PasswordService';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../../../../shared/models/UserService';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  panelOpenState = false;
  tags$ = new BehaviorSubject<Set<string>>(new Set<string>());

  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.generateTemporaryTags();
  }

  generateTemporaryTags(): void {
    this.passwordService.passwords.subscribe(passwords => {
      const allTags: string[] = [];
      passwords.forEach(password => {
        password.tags.forEach(tag => {
          allTags.push(tag);
        });
      });
      this.tags$.next(new Set(allTags?.map(tag => tag)));
    });
  }

  isTheActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  expandElement(elementClass: string, height: string) {
    const element = document.querySelector(elementClass) as HTMLElement;

    if (element.clientHeight === 0) {
      element.style.height = height;
      element.style.opacity = '1';
    } else {
      element.style.height = '0';
      element.style.opacity = '0';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']).then(() => 'logging out');
  }
}
