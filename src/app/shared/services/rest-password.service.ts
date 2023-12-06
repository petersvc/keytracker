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

  readAll(userId: string): Observable<Password[]> {
    const url = `${this._endpoint}?userId=${userId}`;
    return this.http.get<Password[]>(url).pipe(
      catchError(err => {
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  readOne(id: string): Observable<Password> {
    const url = `${this._endpoint}/${id}`;
    return this.http.get<Password>(url).pipe(
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  create(newPassword: Password): void {
    newPassword.id = this.generateId();
    this.http
      .post<Password>(this._endpoint, newPassword)
      .pipe(
        tap(newPassword => {
          const oldPasswords = this.passwords.getValue();
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

  delete(passwordId: string): void {
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

  update(oldPassword: Password, updatedPassword: Password): void {
    const url = `${this._endpoint}/${updatedPassword.id}`;
    console.log('estou aqui no update do rest-password.service.ts');
    console.log('oldPassword: ', oldPassword);
    console.log('updatedPassword: ', updatedPassword);
    this.http
      .put<Password>(url, updatedPassword)
      .pipe(
        tap(updatedPassword => {
          console.log('estou aqui no tap do update do rest-password.service.ts');
          const passwords = this.passwords.getValue();
          const indexToUpdate = passwords.indexOf(oldPassword);
          passwords[indexToUpdate] = updatedPassword;
          this.passwords.next(passwords);
          this.feedbackService.successMessage('Senha atualizada com sucesso!');
        }),
        catchError(err => {
          console.error('Erro ao atualizar senha: ', err);
          this.feedbackService.errorMessage(`Erro ao atualizar senha: ${err.message}`);
          return EMPTY;
        })
      )
      .subscribe();
    console.log('estou aqui no final do update do rest-password.service.ts');
  }

  getPassphrase(id: string): Observable<string> {
    const password = this.readOne(id);
    return password.pipe(map(password => password.passphrase));
  }
}
