import { Password } from '../interfaces/password';
import { BehaviorSubject, map, Observable } from 'rxjs';

// classe usada para implementar o padrão de projeto Strategy
// no appModule é definido qual estratégia será usada através do provider
export abstract class PasswordService {
  public passwords = new BehaviorSubject<Password[]>([] as Password[]);
  public selectedPassword = new BehaviorSubject<Password>({} as Password);

  public showPasswordFormSubject = new BehaviorSubject<boolean>(false);
  public showPasswordFormFlag = this.showPasswordFormSubject.asObservable();

  generateId(): number {
    const id = Math.floor(Math.random() * 100000);
    if (this.passwords.getValue().find(p => p.id === id)) {
      return this.generateId();
    } else {
      return id;
    }
  }

  togglePasswordFormFlag() {
    const flag = !this.showPasswordFormSubject.getValue();
    this.showPasswordFormSubject.next(flag);
  }

  sortPasswordsByName(): void {
    this.passwords.pipe(
      map(passwords => passwords.sort((a, b) => a.application.localeCompare(b.application)))
    );
  }

  abstract create(data: Password): void;
  abstract readAll(id: number): Observable<Password[]>;
  abstract readOne(id: number): Observable<Password>;
  abstract update(updatedPassword: Password): void;
  abstract delete(id: number): void;
  abstract getPassphrase(id: number): Observable<string>;
}
