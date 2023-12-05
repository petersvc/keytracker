import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, EMPTY, Observable } from 'rxjs';
import { UserService } from '../models/UserService';
import { FeedbackService } from './feedback.service';
import { UserData } from '../interfaces/userData';

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

  read(username: string, masterPassword: string): Observable<User> {
    const url = `${this.endpoint}/login`;
    const params = new HttpParams({
      fromString: `username=${username}&masterPassword=${masterPassword}`
    });

    return this.http.post<User>(url, params).pipe(
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );

    // return this.http.post<User>(url, params).pipe(
    //   catchError(err => {
    //     console.error(err);
    //     this.feedbackService.errorMessage(err.message);
    //     return EMPTY;
    //   })
    // );
  }

  login(username: string, masterPassword: string): Observable<UserData> {
    const url = `${this.endpoint}/login`;
    const params = new HttpParams({
      fromString: `username=${username}&masterPassword=${masterPassword}`
    });

    return this.http.post<UserData>(url, params).pipe(
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );

    // return this.http.post<User>(url, params).pipe(
    //   catchError(err => {
    //     console.error(err);
    //     this.feedbackService.errorMessage(err.message);
    //     return EMPTY;
    //   })
    // );
  }

  update(id: string, data: User) {}

  delete(id: string) {}
}
