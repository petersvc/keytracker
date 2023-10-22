import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;
  constructor(
    private readonly userService: UserService,
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
          this._isAuthenticated = true;
          // alert('Login realizado com sucesso ' + user.name);
        } else {
          alert('Usuário ou Senha incorreta!');
        }
      },
      error: err => console.log(err),
      complete: () => {
        console.log('Login Complete: ' + this.isAuthenticated());
        this.router.navigate(['']).then(() => console.log('Redirecting...'));
      }
    });
  }
}
