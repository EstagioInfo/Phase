import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import {PostPage} from '../post/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 lista: FirebaseListObservable<any>;
  mensagem: string;
  referencia;
  arquivo;
  usuario: any;
  usuario2: any;
  items: any[];

  constructor(public navCtrl: NavController,public authProvider: AuthProvider, public np: NavParams, public af: AngularFireDatabase) {
      this.usuario = np.data;
      this.lista = af.list('https://info2017-b6735.firebaseio.com/mural');
      

      var values = [];
      var x = 0;

      this.lista.forEach(list =>{
        for (var _i = list.length-1; _i >=0; _i--){
          values[x] = list[_i];
          x = x+1;
        }
        x = 0;
        this.items = values;
        values = [];
      });


      af.object('cadastro/'+this.usuario.uid).subscribe(usuario=>{
          this.usuario2 = usuario;
      });
  }

  postar() {
    this.navCtrl.push(PostPage, {usuario:this.usuario2});
  }

  baixarArquivo(nome: string){
    let caminho = this.referencia.child('pasta/');
    caminho.getDownloadURL().then(url => {
    });
  }
}
