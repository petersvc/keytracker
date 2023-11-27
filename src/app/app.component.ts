import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { FeedbackService } from './shared/services/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public readonly authService: AuthService,
    public readonly feedbackService: FeedbackService
  ) {}
}
