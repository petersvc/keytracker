import {User} from "../models/user";

export class UserRepository {
  private _users: Map<string, User> = new Map<string, User>();

  getAllUsers(): Map<string, User> {
    return this._users;
  }

  getUserByUserName(userName: string): User | undefined {
    return this._users.get(userName);
  }

  getUserByUserId(userId: string): User | undefined {
    for (const user of this._users.values()) {
      if (user.userId === userId) {
        return user;
      }
    }
    return undefined;
  }

  generateUserId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = 11;

    let userId: string;

    do {
      userId = '';
      for (let i = 0; i < length; i++) {
        userId += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    } while (this.getUserByUserId(userId) !== undefined);

    return userId;
  }

  addUser(user: User) {
    this._users.set(user.username, user);
  }

  deleteUserByName(name: string) {
    this._users.delete(name);
  }

  updateUserByName(userName: string, newName: string, newUsername: string, newMasterPassword: string) {
    const user = this.getUserByUserName(userName);
    if (user !== undefined) {
      if (newName !== '' && user.name !== newName) {
        user.name = newName;
      }
      if (newUsername !== '' && user.username !== newUsername) {
        user.username = newUsername;
      }
      if (newMasterPassword !== '' && user.masterPassword !== newMasterPassword) {
        user.masterPassword = newMasterPassword;
      }
    }
  }
}
