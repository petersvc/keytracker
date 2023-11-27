import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { UserService } from '../models/UserService';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class RestUserService extends UserService {
  private readonly endpoint: string = `${environment.API}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly feedbackService: FeedbackService
  ) {
    super();
  }

  create(newUser: User): void {
    newUser.id = this.generateId();

    this.http.post<User>(this.endpoint, newUser).pipe(
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  read(username: string): Observable<User> {
    const url = `${this.endpoint}?username=${username}`;

    return this.http.get<User[]>(url).pipe(
      map(users => users[0]),
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  update(id: string, data: User) {}

  delete(id: string) {}
}
