import { Component, NgZone, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public zone:NgZone;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
   this.zone = new NgZone({});
    const config = {
      apiKey: "AIzaSyCzO_XlVJaNUt1eMzN1GwtpeOk4mLfWp_4",
      authDomain: "info2017-b6735.firebaseapp.com",
      databaseURL: "https://info2017-b6735.firebaseio.com",
      storageBucket: "info2017-b6735.appspot.com",
      messagingSenderId: "946055744719"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) { 
          this.nav.setRoot(LoginPage);
        } else {
          this.nav.setRoot(TabsPage, {usuario:user});
        }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }}
