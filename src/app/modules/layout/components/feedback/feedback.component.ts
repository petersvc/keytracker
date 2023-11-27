import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedback: FeedbackService;
  constructor(private readonly feedbackService: FeedbackService) {
    this.feedback = this.feedbackService;
  }
}
