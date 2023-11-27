import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { LayoutModule } from './modules/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './shared/models/UserService';
import { FirestoreUserService } from './shared/services/firestore-user.service';
import { RestUserService } from './shared/services/rest-user.service';
import { PasswordService } from './shared/models/PasswordService';
import { FirestorePasswordService } from './shared/services/firestore-password.service';
import { RestPasswordService } from './shared/services/rest-password.service';

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
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: UserService,
      useClass: environment.useFirestore ? FirestoreUserService : RestUserService
    },
    {
      provide: PasswordService,
      useClass: environment.useFirestore ? FirestorePasswordService : RestPasswordService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
