import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
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

  getUserByUsername(username: string): Observable<User> {
    const url = `${this._endpoint}?username=${username}`;
    console.log(username);
    return this.http.get<User[]>(url).pipe(
      map(users => {
        console.log(users);
        console.log(users.length);
        console.log(users[0]);
        if (users && users.length > 0) {
          // Se houver usuários com o nome de usuário fornecido, retorna o primeiro usuário encontrado
          return users[0];
        } else {
          // Se nenhum usuário for encontrado, emite um erro
          throw new Error('Usuário não encontrado');
        }
      }),
      catchError(error => {
        // Trata erros da solicitação HTTP
        console.error('Erro na solicitação HTTP:', error);
        return throwError('Erro ao buscar usuário');
      })
    );
  }

  generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }
}
