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
      --success: rgb(72, 115, 69);
      --error: rgb(115, 72, 69);
      --accent: rgb(35, 36, 61);
      --accent2: rgb(48, 50, 73);
      --background: rgb(11, 11, 13);
      --background-soft: rgb(80, 80, 80);
      --font-color: rgb(255,255,255);
      --active-background: rgb(16, 16, 16);
      --active-background2: rgb(21, 21, 21);
      --active-background3: rgb(25, 25, 25);
       --active-border: rgb(1, 58, 109);
      --dimmed: rgb(150, 150, 150);
      --ultra-dimmed: rgb(42, 51, 60);
      --light-border: rgb(30, 30, 30);
      --lighter-border: rgb(37, 37, 37);
    `;
    } else {
      root.style.cssText = `
      --success: rgb(62, 135, 59);
      --error: rgb(1350, 62, 59);   
      --accent: rgb(235, 237, 255);
      --accent2: rgb(210, 213, 245);
      --background: rgb(255, 255, 255);
      --background-soft: rgb(230, 230, 230);
      --font-color: rgb(10,10,10);
      --active-background: rgb(229, 228, 228);
      --active-background2: rgb(231, 230, 231);
      --active-background3: rgb(235, 235, 235);
       --active-border: rgb(1, 58, 109);
      --dimmed: rgb(100, 100, 100);
      --ultra-dimmed: rgb(42, 51, 60);
      --light-border: rgb(240, 240, 240);
      --lighter-border: rgb(220, 220, 220);
    `;
    }
  }
}
