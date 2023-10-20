import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _endpoint: string = `${environment.API}/users`;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  get user$(): Observable<User | null> {
    return this._user$;
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  createUser(id: string, name: string, masterPassword: string): void {
    this.http
      .post<User>(this._endpoint, {
        id,
        name,
        masterPassword
      })
      .subscribe(user => {
        this.setUser(user);
        alert(`Usuário ${user.id} criado com sucesso!`);
      });
  }
  // deleteUser(id: string) {
  //   this.http
  //     .delete<User>(`${this.endpoint}/${id}`)
  //     .subscribe(user => console.log(`Usuário ${user.username} deletado!}`));
  // }
  //
  // updateUser(id: string, newName: string, newUsername: string, newMasterPassword: string) {
  //   this.http.put<User>(`${this.endpoint}/${id}`, {
  //     newName,
  //     newUsername,
  //     newMasterPassword
  //   });
  // }
  //
  // generateId(): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   const length = 11;
  //   let tempUser: User | undefined;
  //
  //   let id: string;
  //
  //   do {
  //     id = '';
  //     for (let i = 0; i < length; i++) {
  //       id += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     this.getUserByUserId(id).subscribe(user => {
  //       if (user !== undefined) {
  //         tempUser = user;
  //       } else {
  //         tempUser = undefined;
  //       }
  //     });
  //   } while (tempUser);
  //
  //   return id;
  // }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>(`${this._endpoint}/${id}`);
  }
}
