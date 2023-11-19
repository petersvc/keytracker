import { Injectable } from '@angular/core';
import { Password } from '../models/password';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private readonly _endpoint: string = `${environment.API}/passwords`;
  public _passwords = new BehaviorSubject<Password[]>([]);
  private _selectedPassword = new BehaviorSubject<Password>({} as Password);

  private showPasswordFormSubject = new BehaviorSubject<boolean>(false);
  _showPasswordFormFlag = this.showPasswordFormSubject.asObservable();

  constructor(private http: HttpClient) {}

  get selectedPassword(): BehaviorSubject<Password> {
    return this._selectedPassword;
  }

  set selectedPassword(value: BehaviorSubject<Password>) {
    this._selectedPassword = value;
  }

  get showPasswordFormFlag(): Observable<boolean> {
    return this._showPasswordFormFlag;
  }

  togglePasswordFormFlag() {
    const flag = !this.showPasswordFormSubject.getValue();
    this.showPasswordFormSubject.next(flag);
  }

  get passwords(): BehaviorSubject<Password[]> {
    return this._passwords;
  }

  fetchPasswords(userId: string): Observable<Password[]> {
    const url = `${this._endpoint}?userId=${userId}`;
    return this.http.get<Password[]>(url).pipe(
      // map(passwords => passwords),
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    );
  }

  sortPasswordsByName(): void {
    this._passwords.pipe(
      map(passwords => passwords.sort((a, b) => a.application.localeCompare(b.application)))
    );
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
        folder: [],
        favorite: false,
        inBin: false,
        createdAt: new Date()
      })
      .subscribe(password => {
        const oldPasswords = this._passwords.getValue();
        this._passwords.next([...oldPasswords, password]);
        this.sortPasswordsByName();
        alert(`Senha criada com sucesso!`);
      });
  }

  deletePassword(passwordId: string): void {
    const url = `${this._endpoint}/${passwordId}`;
    this.http.delete(url).subscribe(() => {
      const passwords = this._passwords.getValue();
      const passwordToDelete = passwords.find(password => password.id === passwordId);
      const indexToRemove = passwords.indexOf(passwordToDelete as Password);
      passwords.splice(indexToRemove, 1);
      this._passwords.next(passwords);
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
    const passwordToUpdate = this.getPasswordById(id);
    if (!passwordToUpdate) {
      throw new Error(`Password with ID ${id} not found`);
    } else {
      this.http
        .put<Password>(url, {
          ...passwordToUpdate,
          application,
          username,
          passphrase,
          website,
          tags,
          favorite,
          notes
        })
        .subscribe(updatedPassword => {
          const passwords = this._passwords.getValue();
          const index = passwords.indexOf(passwordToUpdate);
          passwords[index] = updatedPassword;
          this._passwords.next(passwords);
          alert('Senha atualizada com sucesso!');
        });
    }
  }

  getPasswordById(passwordId: string): Password {
    const oldPasswords = this._passwords.getValue();
    const password = oldPasswords.find(password => password.id === passwordId);
    if (password) {
      return password;
    } else {
      throw new Error(`Password with ID ${passwordId} not found`);
    }
  }
}
// .subscribe(updatedPassword => {
//   const index = this._passwords.indexOf(password);
//   this._passwords[index] = updatedPassword;
//   alert('Senha atualizada com sucesso!');
// });
