import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { LayoutModule } from './modules/layout/layout.module';
import { UserService } from './shared/models/UserService';
import { FirestoreUserService } from './shared/services/firestore-user.service';
import { RestUserService } from './shared/services/rest-user.service';
import { PasswordService } from './shared/models/PasswordService';
import { FirestorePasswordService } from './shared/services/firestore-password.service';
import { RestPasswordService } from './shared/services/rest-password.service';

const service = {
  firestore: { user: FirestoreUserService, password: FirestorePasswordService },
  rest: { user: RestUserService, password: RestPasswordService }
};

const serviceType = environment.SERVICE_TYPE as keyof typeof service;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: UserService,
      useClass: service[serviceType].user
    },
    {
      provide: PasswordService,
      useClass: service[serviceType].password
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
