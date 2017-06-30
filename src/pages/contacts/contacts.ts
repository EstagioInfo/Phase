import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatPage} from '../chat/chat';
import firebase from 'firebase';


/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

 lista: FirebaseListObservable <any>;
  searchQuery: string = '';
  items: any[];
  usuario2: any;
  usuario: any;
  x: any;

  public nameList:Array<any>;
  public loadedNameList:Array<any>;
  public nameRef:firebase.database.Reference;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nameRef = firebase.database().ref('/cadastro');

    this.nameRef.on('value', nameList => {
      let names = [];
      nameList.forEach( name => {
        names.push(name.val());
        return false;
      });

      this.nameList = names;
      this.loadedNameList = names;
    });
  }



  initializeItems(){
    this.nameList = this.loadedNameList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.nameList = this.nameList.filter((v) => {
      if(v.nome && q) {
        if (v.nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.nameList.length);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }


abrir(item){

   this.usuario2 = this.navParams.data;
    this.af.object('cadastro/'+this.usuario2.uid).subscribe(usuario=>{
          this.usuario = usuario;
      });
    let key= this.usuario.uid;
    this.x = item;
    this.navCtrl.push(ChatPage, {usuario2:this.x,usuario:this.usuario});
  }

}
