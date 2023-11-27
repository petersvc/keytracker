import { Injectable } from '@angular/core';
import { PasswordService } from '../models/PasswordService';
import { Password } from '../interfaces/password';
import { catchError, EMPTY, from, map, Observable, tap } from 'rxjs';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorePasswordService extends PasswordService {
  private readonly collectionName: string = 'passwords';
  private readonly passwordsCollection = collection(this.fs, this.collectionName);

  constructor(
    private readonly fs: Firestore,
    private readonly feedbackService: FeedbackService
  ) {
    super();
  }

  create(data: Password): void {
    data.id = this.generateId();
    setDoc(doc(this.passwordsCollection, data.id), data).then(() => {
      this.feedbackService.successMessage('Senha criada com sucesso!');
    });
  }

  readAll(userId: string): Observable<Password[]> {
    const q = query(
      this.passwordsCollection,
      orderBy('application'),
      where('userId', '==', userId)
    );

    return new Observable<Password[]>(subscriber => {
      return onSnapshot(q, querySnapshot => {
        const passwords = querySnapshot.docs.map(doc => doc.data() as Password);
        subscriber.next(passwords);
      });
    }).pipe(
      tap(() => {
        this.feedbackService.successMessage('Senhas encontradas!');
      }),
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  readOne(id: string): Observable<Password> {
    const docRef = doc(this.passwordsCollection, id);
    return from(getDoc(docRef)).pipe(
      map(doc => doc.data() as Password),
      tap(password => {
        if (password) {
          this.feedbackService.successMessage(`Senha ${password.application} encontrada!`);
        }
      }),
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  update(updatedPassword: Password): void {
    const docRef = doc(this.passwordsCollection, updatedPassword.id);
    from(
      updateDoc(docRef, {
        ...updatedPassword
      })
    ).pipe(
      tap(() => {
        this.feedbackService.successMessage('Senha atualizada com sucesso!');
      }),
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }

  delete(id: string): void {
    const docRef = doc(this.passwordsCollection, id);
    from(deleteDoc(docRef)).subscribe(() => {
      this.feedbackService.successMessage('Senha deletada com sucesso!');
    });
  }

  getPassphrase(id: string): Observable<string> {
    const password = this.readOne(id);
    return password.pipe(
      map(password => password.passphrase),
      catchError(err => {
        console.error(err);
        this.feedbackService.errorMessage(err.message);
        return EMPTY;
      })
    );
  }
}