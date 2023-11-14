import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { PasswordService } from './password.service';

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
    this.userService.getUserByUserId(username).subscribe({
      next: user => {
        if (user !== null && user.masterPassword === password) {
          this.userService.setUser(user);
          this.passwordService.fetchPasswords(user.id);
          this._isAuthenticated = true;
        } else {
          alert('Usuário ou Senha incorreta!');
        }
      },
      error: err => console.log(err),
      complete: () => {
        console.log(this.isAuthenticated() ? 'Usuário autenticado' : 'Usuário não autenticado');
        this.passwordService.passwords$.subscribe(passwords => {
          let route = 'passwords/';
          if (passwords) {
            route += passwords[0].id;
            this.router.navigate([route]).then(() => console.log('Redirecting...'));
          }
        });
      }
    });
  }
}
