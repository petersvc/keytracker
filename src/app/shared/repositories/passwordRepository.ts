import { Password } from '../models/password';

export class PasswordRepository {
  private _Passwords: Map<string, Password> = new Map<string, Password>();

  getAllPasswords(): Map<string, Password> {
    return this._Passwords;
  }

  getPasswordByApplication(application: string): Password | undefined {
    return this._Passwords.get(application);
  }

  addPassword(password: Password) {
    this._Passwords.set(password.application, password);
  }

  deletePasswordByApplication(application: string) {
    this._Passwords.delete(application);
  }

  updatePasswordByApplication(application: string, newPassphrase: string, newDescription: string) {
    const password = this.getPasswordByApplication(application);
    if (password !== undefined) {
      if (newPassphrase !== '' && password.passphrase !== newPassphrase) {
        password.passphrase = newPassphrase;
      }
      if (newDescription !== '' && password.description !== newDescription) {
        password.description = newDescription;
      }
    }
  }
}
