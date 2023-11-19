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
    this.userService.fetchUser(username).subscribe(user => {
      if (user.masterPassword === password) {
        this._isAuthenticated = true;
        this.userService.user.next(user);
        this.passwordService.fetchPasswords(user.id).subscribe(passwords => {
          this.passwordService.passwords.next(passwords);
          this.passwordService.selectedPassword.next(passwords[0]);
          const route = 'passwords/';
          this.router.navigate([route]).then(() => console.log('Redirecting...'));
        });
      }
    });
    //   next: user => {
    //     console.log(user.username + '---' + user.masterPassword);
    //     if (user.masterPassword === password) {
    //       this._isAuthenticated = true;
    //       this.userService.user.next(user);
    //       this.passwordService.fetchPasswords(user.id).subscribe(passwords => {
    //         let route = 'passwords/';
    //         if (passwords) {
    //           route += passwords[0].id;
    //         }
    //         this.router.navigate([route]).then(() => console.log('Redirecting...'));
    //       });
    //     } else {
    //       alert('Usuário ou Senha incorreta!');
    //     }
    //   },
    //   error: err => console.log(err),
    //   complete: () => {
    //     console.log(this.isAuthenticated() ? 'Usuário autenticado' : 'Usuário não autenticado');
    //   }
    // });
  }
}
