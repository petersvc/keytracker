import { Component } from '@angular/core';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keytracker';
  currentUser!: User;
  constructor() {
    //this.currentUser = new User('Peter', 'peter@gmail.com', '123456');
  }
}
