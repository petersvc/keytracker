import { Injectable } from '@angular/core';
import { PasswordRepository } from '../repositories/passwordRepository';
import { Password } from '../models/password';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private _passwordRepository: PasswordRepository;

  constructor() {
    this._passwordRepository = new PasswordRepository();
  }

  getAllPasswords(): Map<string, Password> | undefined {
    return this._passwordRepository.getAllPasswords();
  }

  getPasswordByApplication(application: string): Password | undefined {
    return this._passwordRepository.getPasswordByApplication(application);
  }

  addPassword(passphrase: string, application: string, description: string, userId: string) {
    if (this._passwordRepository.getPasswordByApplication(application) === undefined) {
      this._passwordRepository.addPassword(
        new Password(application, passphrase, description, userId)
      );
    } else {
      console.log('Password already exists');
    }
  }

  deletePassword(application: string) {
    this._passwordRepository.deletePasswordByApplication(application);
  }

  updatePassword(application: string, newPassphrase: string, newDescription: string) {
    this._passwordRepository.updatePasswordByApplication(
      application,
      newPassphrase,
      newDescription
    );
  }
}
