import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  excluir2;
  referencia: any;
  ref: FirebaseObjectObservable<any>;
  usuario: any;
  usuario2: any;
  card: FirebaseListObservable<any>;
  id: any;
  items: any[];
  opcoes = [
    'Excluir'
   ]; 
  
  constructor(public navCtrl: NavController, public np: NavParams,public authProvider: AuthProvider,public af: AngularFireDatabase, public alertCtrl: AlertController,  @Inject(FirebaseApp) fb:any) {
      
      this.referencia = fb.storage().ref();
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
        for (var _i = list.length-1; _i >=0; _i--){

          if(list[_i].idUser == this.id){
            values[x] = list[_i];
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
  excluir(item){

    let confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir a postagem?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Continuar',
          handler: () => {
            console.log('Agree clicked');

            if(item.caminho!=""){
             this.excluir2 = this.referencia.child('pasta/'+item.caminho);
              this.excluir2.delete().then(()=>{
                console.log("Deu certo");
              }).catch(({

             }));
           }
            this.ref = this.af.object('/mural/'+item.$key);
            this.ref.remove();
          }
        }
      ]
    });
    confirm.present();

  }

}
