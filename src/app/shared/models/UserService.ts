import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

// classe usada para implementar o padrão de projeto Strategy
// no appModule é definido qual estratégia será usada através do provider
export abstract class UserService {
  private _user$ = new BehaviorSubject<User>({} as User);

  get user(): BehaviorSubject<User> {
    return this._user$;
  }

  generateId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  abstract create(newUser: User): void;
  abstract read(username: string, masterPassword: string): Observable<User>;
  abstract update(id: string, data: User): void;
  abstract delete(id: string): void;
}
