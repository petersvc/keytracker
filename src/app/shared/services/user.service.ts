import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _endpoint: string = `${environment.API}/users`;
  private _user$ = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient) {}

  get user(): BehaviorSubject<User> {
    return this._user$;
  }

  createUser(name: string, username: string, masterPassword: string): void {
    this.http
      .post<User>(this._endpoint, {
        id: this.generateId(),
        name,
        username,
        masterPassword
      })
      .subscribe(user => {
        // this.setUser(user);
        alert(`Usuário ${user.username} criado com sucesso!`);
      });
  }

  fetchUser(username: string): Observable<User> {
    const url = `${this._endpoint}?username=${username}`;
    const user = this.http.get<User[]>(url).pipe(
      map(users => users[0]),
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    );
    user.subscribe(user => console.log('FetchUser: ' + user.username));
    return user;
  }

  generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
