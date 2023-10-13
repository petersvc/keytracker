import { Injectable } from '@angular/core';
import {UserRepository} from "../repositories/userRepository";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  getAllUsers(): Map<string, User> | undefined {
    return this._userRepository.getAllUsers();
  }

  getUserByName(name: string): User | undefined {
    return this._userRepository.getUserByUserName(name);
  }

  createUser(name: string, userName: string, masterPassword: string): string | void {
    if (this._userRepository.getUserByUserName(name) === undefined) {
      this._userRepository.addUser(new User(this._userRepository.generateUserId(), name, userName, masterPassword));
    } else {
      return 'User already exists';
    }
  }

  deleteUser(name: string) {
    this._userRepository.deleteUserByName(name);
  }

  updateUser(name: string, newName: string, newEmail: string, newMasterPassword: string) {
    this._userRepository.updateUserByName(name, newName, newEmail, newMasterPassword);
  }

}
