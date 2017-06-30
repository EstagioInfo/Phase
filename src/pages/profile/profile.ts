import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  usuario: any;
  usuario2: any;
  card: FirebaseListObservable<any>;
  id: any;
  items: any[];
  
  constructor(public navCtrl: NavController, public np: NavParams,public authProvider: AuthProvider,public af: AngularFireDatabase) {
      this.usuario2 = np.data;
      this.id = this.usuario2.uid;
      console.log(this.id);
      af.object('cadastro/'+this.usuario2.uid).subscribe(usuario=>{
          this.usuario = usuario;
      });
      this.card = af.list('https://info2017-b6735.firebaseio.com/mural');
      var values = [];
      var x = 0;

      this.card.forEach(list =>{
        for (var _i = 1; _i <= list.length; _i++){
          if(list[_i-1].idUser == this.id){
            values[x] = list[_i-1];
            x = x+1;
          }
        }
        x = 0;
        this.items = values;
        values = [];
      });
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
