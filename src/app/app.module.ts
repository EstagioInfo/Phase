import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPageModule } from '../pages/login/login.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { PasswordResetPageModule } from '../pages/password-reset/password-reset.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { PostPageModule } from '../pages/post/post.module';

import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


export const firebaseConfig = {
  apiKey: "AIzaSyCzO_XlVJaNUt1eMzN1GwtpeOk4mLfWp_4",
  authDomain: "info2017-b6735.firebaseapp.com",
  databaseURL: "https://info2017-b6735.firebaseio.com",
  projectId: "info2017-b6735",
  storageBucket: "info2017-b6735.appspot.com",
  messagingSenderId: "946055744719"
};

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    ContactsPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    SignUpPageModule,
    PasswordResetPageModule,
    ChatPageModule,
    PostPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    ContactsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
