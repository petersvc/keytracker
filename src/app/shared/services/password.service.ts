import { Injectable } from '@angular/core';
import { Password } from '../models/password';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  setSelectedPassword$(password: Password) {
    this.selectedPasswordSubject.next(password);
  }

  setFirstSelectedPassword() {
    this.passwords$.subscribe(passwords => {
      const firstPassword = passwords ? passwords[0] : null;
      this.setSelectedPassword$(firstPassword as Password);
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

  fetchPasswords(userId: string): void {
    const url = `${this._endpoint}?userId=${userId}`;
    this.http.get<Password[]>(url).subscribe(passwords => {
      this.passwordsSubject.next(passwords);
      this.sortPasswordsByName();
    });
  }

  sortPasswordsByName(): void {
    const passwords = this.passwordsSubject.getValue() as Password[];
    const sortedPasswords = passwords.sort((a, b) => {
      if (a.application < b.application) {
        return -1;
      }
      if (a.application > b.application) {
        return 1;
      }
      return 0;
    });
    this.passwordsSubject.next(sortedPasswords);
  }

  createPassword(
    application: string,
    username: string,
    passphrase: string,
    website: string,
    tags: string[],
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
        tags,
        notes,
        userId,
        folder: []
      })
      .subscribe(password => {
        this.passwordsSubject.next([...(this.passwordsSubject.getValue() as Password[]), password]);
        this.sortPasswordsByName();
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

  updatePassword(
    id: string,
    application: string,
    username: string,
    passphrase: string,
    website: string,
    tags: string[],
    favorite: boolean,
    notes: string
  ): void {
    const url = `${this._endpoint}/${id}`;
    this.getPasswordById(id).subscribe(password => {
      if (!password) {
        throw new Error(`Password with ID ${id} not found`);
      } else {
        this.http
          .put<Password>(url, {
            ...password,
            application,
            username,
            passphrase,
            website,
            tags,
            favorite,
            notes
          })
          .subscribe(updatedPassword => {
            const passwords = this.passwordsSubject.getValue() as Password[];
            const index = passwords.indexOf(password);
            passwords[index] = updatedPassword;
            alert('Senha atualizada com sucesso!');
          });
      }
    });
  }

  getPasswordById(passwordId: string): Observable<Password> {
    return this._passwords$.pipe(
      map(passwords => {
        if (!passwords) {
          throw new Error('Passwords not available');
        }
        const password = passwords.find(p => p.id === passwordId);
        if (!password) {
          throw new Error(`Password with ID ${passwordId} not found`);
        }
        return password;
      })
    );
  }
}
