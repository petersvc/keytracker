import { Injectable } from '@angular/core';
import { UserService } from '../models/UserService';
import { Router } from '@angular/router';
import { PasswordService } from '../models/PasswordService';
import { environment } from 'src/environments/environment';
import { RestUserService } from './rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;

  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly router: Router
  ) {}

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  login(username: string, masterPassword: string): void {
    if (environment.SERVICE_TYPE === 'rest') {
      (this.userService as RestUserService).login(username, masterPassword).subscribe(userData => {
        this._isAuthenticated = true;
        console.log('User authenticated!');
        this.userService.user.next(userData.user);
        this.passwordService.passwords.next(userData.passwords);
        this.passwordService.selectedPassword.next(userData.passwords[0]);
        this.passwordService.sortPasswords('A-Z');
        const route = 'passwords/';
        this.router.navigate([route]).then(() => console.log('Redirecting...'));
      });
    } else {
      this.userService.read(username, masterPassword).subscribe(user => {
        this._isAuthenticated = true;
        console.log('User authenticated!');
        this.userService.user.next(user);
        this.passwordService.readAll(user.id as number).subscribe(passwords => {
          this.passwordService.passwords.next(passwords);
          this.passwordService.selectedPassword.next(passwords[0]);
          const route = 'passwords/';
          this.router.navigate([route]).then(() => console.log('Redirecting...'));
        });
      });
    }
  }

  logout(): void {
    this._isAuthenticated = false;
    console.log('User logged out!');
    this.userService.logout();
    this.passwordService.passwords.next([]);
  }
}
