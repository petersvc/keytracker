import { Injectable } from '@angular/core';
import { UserService } from '../models/UserService';
import { Router } from '@angular/router';
import { PasswordService } from '../models/PasswordService';

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

  login(username: string, password: string): void {
    this.userService.read(username).subscribe(user => {
      if (user.masterPassword === password) {
        this._isAuthenticated = true;
        console.log('User authenticated!');
        this.userService.user.next(user);
        this.passwordService.readAll(user.id).subscribe(passwords => {
          this.passwordService.passwords.next(passwords);
          this.passwordService.selectedPassword.next(passwords[0]);
          const route = 'passwords/';
          this.router.navigate([route]).then(() => console.log('Redirecting...'));
        });
      }
    });
  }
}
