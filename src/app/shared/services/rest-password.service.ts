import { Injectable } from '@angular/core';
import { Password } from '../interfaces/password';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeedbackService } from './feedback.service';
import { PasswordService } from '../models/PasswordService';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordService extends PasswordService {
  private readonly _endpoint: string = `${environment.API}/passwords`;

  constructor(
    private http: HttpClient,
    private readonly feedbackService: FeedbackService
  ) {
    super();
  }

  readAll(userId: number): Observable<Password[]> {
    const url = `${this._endpoint}?userId=${userId}`;
    return this.http.get<Password[]>(url).pipe(
      catchError(err => {
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  readOne(id: number): Observable<Password> {
    const url = `${this._endpoint}/${id}`;
    return this.http.get<Password>(url).pipe(
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  delete(passwordId: number): void {
    const url = `${this._endpoint}/${passwordId}`;
    this.http.delete(url).pipe(
      tap(() => {
        const passwords = this.passwords.getValue();
        const passwordToDelete = passwords.find(password => password.id === passwordId);
        if (passwordToDelete) {
          const indexToRemove = passwords.indexOf(passwordToDelete);
          passwords.splice(indexToRemove, 1);
        }

        this.passwords.next(passwords);
      })
    );
  }

  create(password: Password): void {
    this.http
      .post<Password>(this._endpoint, password)
      .pipe(
        tap(newPassword => {
          const oldPasswords = this.passwords.getValue();
          console.log('newPassword: ', newPassword);
          this.passwords.next([...oldPasswords, newPassword]);
          this.sortPasswordsByName();
          this.feedbackService.successMessage('Senha criada com sucesso!');
        }),
        catchError(err => {
          this.feedbackService.errorMessage(err.message);
          return EMPTY;
        })
      )
      .subscribe();
  }

  update(updatedPassword: Password): void {
    const url = `${this._endpoint}/${updatedPassword.id}`;
    const id = updatedPassword.id;
    this.http
      .put<Password>(url, updatedPassword)
      .pipe(
        catchError(err => {
          console.error('Erro ao atualizar senha: ', err);
          this.feedbackService.errorMessage(`Erro ao atualizar senha: ${err.message}`);
          return EMPTY;
        })
      )
      .subscribe(() => {
        const oldPasswords = this.passwords.getValue();
        const indexToUpdate = oldPasswords.findIndex(password => password.id === id);
        oldPasswords[indexToUpdate] = updatedPassword;
        this.passwords.next(oldPasswords);
        this.feedbackService.successMessage('Senha atualizada com sucesso!');
      });
  }

  getPassphrase(id: number): Observable<string> {
    const password = this.readOne(id);
    return password.pipe(map(password => password.passphrase));
  }
}

// const passwords = this.passwords.getValue();
// console.log('antes do find');
// console.log('updatedPassword: ' + updatedPassword);
// const oldPassword = passwords.filter(password => password.id === updatedPassword.id)[0];
// if (oldPassword) {
//   console.log('oldPassword', oldPassword);
//   const indexToUpdate = passwords.indexOf(oldPassword);
//   passwords[indexToUpdate] = updatedPassword;
//   this.passwords.next(passwords);
//   this.feedbackService.successMessage('Senha atualizada com sucesso!');
// } else {
//   console.error('Senha não encontrada!');
//   this.feedbackService.errorMessage('Senha antiga não encontrada!');
// }
