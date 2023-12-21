import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from '../../../../shared/models/UserService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: BehaviorSubject<User>;
  themeOptions = ['light_mode', 'dark_mode'];
  selectedThemeOption = 'dark_mode';

  constructor(private readonly userService: UserService) {
    this.user$ = this.userService.user;
  }

  onThemeOptionChange(theme: string) {
    const root = document.documentElement;

    if (theme === 'dark_mode') {
      root.style.cssText = `
      --accent: rgb(49, 59, 46);
      --accent2: rgb(48, 50, 73);
      --success: rgb(72, 115, 69);
      --error: rgb(200, 162, 158);
      --background: rgb(22, 22, 22);
      --background-soft: rgb(80, 80, 80);
      --font-color: rgb(255, 255, 255);
      --active-background: rgb(26, 26, 26);
      --active-background2: rgb(31, 31, 31);
      --active-background3: rgb(35, 35, 35);
      --active-border: rgb(1, 58, 109);
      --dimmed: rgb(150, 150, 150);
      --ultra-dimmed: rgb(42, 51, 60);
      --light-border: rgb(35, 35, 35);
      --lightest-border: rgb(47, 47, 47);
      --lighter-border: rgb(40, 40, 40);
    `;
    } else {
      root.style.cssText = `
      --success: rgb(62, 135, 59);
      --error: rgb(135, 62, 59);   
      --accent: rgb(225, 245, 229);
      --accent2: rgb(210, 213, 245);
      --background: rgb(255, 255, 255);
      --background-soft: rgb(230, 230, 230);
      --font-color: rgb(10,10,10);
      --active-background: rgb(221, 221, 221);
      --active-background2: rgb(228, 228, 228);
      --active-background3: rgb(240, 240, 240);
       --active-border: rgb(1, 58, 109);
      --dimmed: rgb(100, 100, 100);
      --ultra-dimmed: rgb(42, 51, 60);
      --light-border: rgb(225, 225, 225);
      --lighter-border: rgb(205, 205, 205);
    `;
    }
  }
}
