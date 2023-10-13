import {Component, Input} from '@angular/core';
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  @Input() currentUser!:User;

  createUser() {
    console.log('createUser()');
  }

  findUserByName() {
    console.log('verifyUser()');
  }
}
