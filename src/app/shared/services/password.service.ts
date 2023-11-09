import { Injectable } from '@angular/core';
import { Password } from '../models/password';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private readonly _endpoint: string = `${environment.API}/passwords`;
  private passwordsSubject: BehaviorSubject<Password[] | null> = new BehaviorSubject<
    Password[] | null
  >(null);
  private _passwords$: Observable<Password[] | null> = this.passwordsSubject.asObservable();
  private selectedPasswordSubject = new BehaviorSubject<Password | null>(null);
  _selectedPassword$ = this.selectedPasswordSubject.asObservable();
  private showPasswordFormSubject = new BehaviorSubject<boolean>(false);
  _showPasswordFormFlag = this.showPasswordFormSubject.asObservable();

  constructor(private http: HttpClient) {}

  get selectedPassword$(): Observable<Password | null> {
    return this._selectedPassword$;
  }

  set selectedPassword$(password: Password) {
    this.selectedPasswordSubject.next(password);
  }

  setFirstSelectedPassword() {
    this.passwords$.subscribe(passwords => {
      const firstPassword = passwords ? passwords[0] : null;
      this.selectedPassword$ = firstPassword as Password;
    });
  }

  get showPasswordFormFlag(): Observable<boolean> {
    return this._showPasswordFormFlag;
  }

  togglePasswordFormFlag() {
    const flag = !this.showPasswordFormSubject.getValue();
    this.showPasswordFormSubject.next(flag);
  }

  get passwords$(): Observable<Password[] | null> {
    return this._passwords$;
  }

  setPasswords(userId: string): void {
    this.getPasswordsByUserId(userId).subscribe(passwords => {
      this.passwordsSubject.next(passwords);
    });
  }

  createPassword(
    application: string,
    username: string,
    passphrase: string,
    website: string,
    notes: string,
    userId: string
  ): void {
    this.http
      .post<Password>(this._endpoint, {
        id: this.generateId(),
        application,
        username,
        passphrase,
        website,
        notes,
        userId,
        folder: [],
        tags: []
      })
      .subscribe(password => {
        //this.setPassword(password);
        this.passwordsSubject.next([...(this.passwordsSubject.getValue() as Password[]), password]);
        alert(`Senha criada com sucesso!`);
      });
  }

  deletePassword(passwordId: string): void {
    const url = `${this._endpoint}/${passwordId}`;
    this.http.delete(url).subscribe(() => {
      const passwords = this.passwordsSubject.getValue() as Password[];
      const updatedPasswords = passwords.filter(password => password.id !== passwordId);
      this.passwordsSubject.next(updatedPasswords);
      alert('Senha deletada com sucesso!');
    });
  }

  generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  getPasswordByPasswordId(id: string): Observable<Password> {
    const url = `${this._endpoint}/${id}`;
    return this.http.get<Password>(url);
  }

  getPasswordsByUserId(userId: string): Observable<Password[] | null> {
    const url = `${this._endpoint}?userId=${userId}`;
    return this.http.get<Password[]>(url);
  }

  updatePassword(
    application: string,
    username: string,
    passphrase: string,
    website: string,
    notes: string
  ): void {
    const password = this.selectedPasswordSubject.getValue() as Password;
    const url = `${this._endpoint}/${password.id}`;
    this.http
      .put<Password>(url, {
        ...password,
        application,
        username,
        passphrase,
        website,
        notes
      })
      .subscribe(updatedPassword => {
        const passwords = this.passwordsSubject.getValue() as Password[];
        const updatedPasswords = passwords.map(password => {
          if (password.id === updatedPassword.id) {
            return updatedPassword;
          }
          return password;
        });
        this.passwordsSubject.next(updatedPasswords);
        alert('Senha atualizada com sucesso!');
      });
  }
}
