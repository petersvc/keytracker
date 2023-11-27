import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public success = true;
  public message = '';
  public icon = 'mood'; // angular material icon
  public animate = false;
  public show = false;

  errorMessage(message: string) {
    this.show = true;
    this.success = false;
    this.message = message;
    this.icon = 'sentiment_very_dissatisfied';
    this.animate = true;
    this.closeMessage();
  }

  successMessage(message: string) {
    this.show = true;
    this.success = true;
    this.message = message;
    this.animate = true;
    this.closeMessage();
  }

  closeMessage() {
    setTimeout(() => {
      if (!this.success) {
        this.success = true;
        this.icon = 'mood';
      }
      this.message = '';
      this.animate = false;
      this.show = false;
    }, 4000);
  }
}
