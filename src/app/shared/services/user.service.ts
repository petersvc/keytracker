import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint: string = `${environment.API}/users`;

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint)
  }

  getUserByUserName(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.endpoint}?username=${username}`)
  }

  createUser(name: string, username: string, masterPassword: string): Observable<User> {
    const id = this.generateId();
    return this.http.post<User>(this.endpoint, {id, name, username, masterPassword})
  }

  deleteUser(id: string) {
    this.http.delete<User>(`${this.endpoint}/${id}`)
  }

  updateUser(id: string, newName: string, newUsername: string, newMasterPassword: string) {
    this.http.put<User>(`${this.endpoint}/${id}`, {newName, newUsername, newMasterPassword})
  }

  generateId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = 11
    let tempUser: User | undefined;

    let id: string;

    do {
      id = '';
      for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.getUserByUserId(id).subscribe(user => {
        if (user !== undefined) {
          tempUser = user;
        } else {
          tempUser = undefined;
        }
      });
    } while (tempUser);

    return id;
  }

  getUserByUserId(id: string): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`)
  }

}
