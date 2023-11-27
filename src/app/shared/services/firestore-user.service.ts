import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { UserService } from '../models/UserService';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService extends UserService {
  private readonly collectionName: string = 'users';
  private readonly usersCollection = collection(this.fs, this.collectionName);

  constructor(
    private readonly fs: Firestore,
    private readonly feedbackService: FeedbackService
  ) {
    super();
  }

  create(newUser: User): void {}

  read(username: string): Observable<User> {
    return (collectionData(this.usersCollection) as Observable<User[]>).pipe(
      map(users => users.find(user => user.username === username) as User),
      tap(user => {
        if (user) {
          this.feedbackService.successMessage(`Usuário ${user.username} encontrado!`);
        }
      }),
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
