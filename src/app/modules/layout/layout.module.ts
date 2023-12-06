import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { PasswordManagementComponent } from './components/password-management/password-management.component';
import { NavbarComponent } from './components/sidebar/navbar/navbar.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { PasswordsHeaderComponent } from './components/passwords/passwords-header/passwords-header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PasswordsComponent,
    PasswordManagementComponent,
    NavbarComponent,
    FeedbackComponent,
    HeaderComponent,
    PasswordsHeaderComponent
  ],
  exports: [SidebarComponent, FeedbackComponent, HeaderComponent, PasswordManagementComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
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
    MatButtonToggleModule,
    MatTableModule
  ]
})
export class LayoutModule {}
