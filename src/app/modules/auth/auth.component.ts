import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Input() currentUser!: User;
}
