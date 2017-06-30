import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {FirebaseListObservable, AngularFireDatabase} from "angularfire2/database";
import {Subscription} from "rxjs/Subscription";
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
 @ViewChild(Content) content: Content;
  active: boolean;

  chats: FirebaseListObservable<any>;
  message: string;
  appointmentSubscription: Subscription;
  chatSubscription: Subscription;
  usuario: any;
  usuario2: any;
  nom:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {


		    this.usuario= this.navParams.get("usuario");


		    this.usuario2= this.navParams.get("usuario2");
		    this.nom= this.usuario.id + this.usuario2.id + 'chat';

		    this.chats = this.af.list(this.nom, {
		    query: {
		      orderByChild: 'dateTime'
		    }
		  });
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

   sendMessage() {

    if(this.message) {
      let chat = {
        message: this.message,
        dateTime: new Date().getTime()

      };
      this.af.list(this.nom).push(chat);
    }
  }

}
