import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';



@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  lista : FirebaseListObservable<any>;
  mensagem: string;
  imagem: string;
  imagemDoc: string;
  doc: any;
  id: string;
  referencia: any;
  arquivo: any;
  usuario: any;
  ref: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, @Inject(FirebaseApp) fb:any) {
   this.lista = af.list('https://info2017-b6735.firebaseio.com/mural');
   console.log(this.navParams.get("usuario"));
    this.referencia = fb.storage().ref();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }
   enviarArquivo(){
    this.usuario= this.navParams.get("usuario");

    if(this.arquivo.name){
      let caminho = this.referencia.child('pasta/'+this.arquivo.name);
      let tarefa = caminho.put(this.arquivo);
      tarefa.on('state_changed', (snapshot)=>{

      }, error => {

      }, () => {

        if(this.mensagem) {
          let m ={
            idUser: this.usuario.id,
            imagemBanco: this.usuario.imagem,
            nome: this.usuario.nome,
            texto: this.mensagem,
            imagem: tarefa.snapshot.downloadURL,
            data: new Date().getTime()
          };
          this.lista.push(m).then(() =>{
            this.mensagem = " ";
          });
        }
      });
    }else if(this.mensagem) {
       let m ={
         idUser: this.usuario.id,
          imagemBanco: this.usuario.imagem,
         nome: this.usuario.nome,
         texto: this.mensagem,
         imagem: null,
         data: new Date().getTime()
       };
       this.lista.push(m).then(() =>{
         this.mensagem = " ";
       });
     }

  }

  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
  }

}
