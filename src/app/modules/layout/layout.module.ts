import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { PasswordsListComponent } from './components/passwords/passwords-list/passwords-list.component';
import { PasswordDetailsComponent } from './components/passwords/password-details/password-details.component';
import { NavbarComponent } from './components/sidebar/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { AddPasswordFormComponent } from './components/sidebar/add-password-form/add-password-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewPasswordFormComponent } from './components/passwords/new-password-form/new-password-form.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PasswordsComponent,
    PasswordsListComponent,
    PasswordDetailsComponent,
    NavbarComponent,
    AddPasswordFormComponent,
    NewPasswordFormComponent,
    FeedbackComponent
  ],
  exports: [SidebarComponent, FeedbackComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    FontAwesomeModule,
    MatBadgeModule
  ]
})
export class LayoutModule {}
