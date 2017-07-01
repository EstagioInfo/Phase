import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  htmlYouWantToAdd;
  excluir;
  i: any=0;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, @Inject(FirebaseApp) fb:any, public alertCtrl: AlertController) {
    
    this.lista = af.list('https://info2017-b6735.firebaseio.com/mural');
    this.referencia = fb.storage().ref();
  
  }


  enviarArquivo(){

    this.usuario= this.navParams.get("usuario");


    if(this.imagem=="s" && this.mensagem==""){
      let alert = this.alertCtrl.create({
          title: 'É necessário enviar pelo menos uma mensagem ou um texto',
          buttons: ['Ok']
        });
        alert.present();


    }
    if(this.imagem!="s" && this.mensagem=="" ){

      let m ={
         idUser: this.usuario.id,
              imagemBanco: this.usuario.imagem,
              nome: this.usuario.nome,
              texto: "",
              imagem: this.imagem,
              data: new Date().getTime()
       };
       this.lista.push(m).then(() =>{
         this.mensagem = " ";
       });

       this.navCtrl.pop();
    }

    if(this.imagem=="s" && this.mensagem!=""){

        let m ={
            idUser: this.usuario.id,
            imagemBanco: this.usuario.imagem,
            nome: this.usuario.nome,
            texto: this.mensagem,
            imagem: "",
            data: new Date().getTime()
       };
       this.lista.push(m).then(() =>{
         this.mensagem = " ";
       });
      this.navCtrl.pop();

    }

    if(this.imagem!="s" && this.mensagem!=""){

      let m ={
              idUser: this.usuario.id,
              imagemBanco: this.usuario.imagem,
              nome: this.usuario.nome,
              texto: this.mensagem,
              imagem: this.imagem,
              data: new Date().getTime()
       };
       this.lista.push(m).then(() =>{
         this.mensagem = " ";
       });

      this.navCtrl.pop();
    }


  }



  atualizaArquivo(event){
    if(this.i>=1){
        this.excluir.delete().then(()=>{
          console.log("Deu certo");
        }
        ).catch(({

        }));
    }


    this.arquivo = event.srcElement.files[0];

    let caminho = this.referencia.child('pasta/'+this.arquivo.name);
    let tarefa = caminho.put(this.arquivo);
    this.excluir = caminho;
    
      tarefa.on('state_changed', (snapshot)=>{
         // Acompanha os estados do upload (progresso, pausado,...)
      }, error => {
         // Tratar possíveis erros
      }, () => {
         // Função de retorno quando o upload estiver completo  
         console.log(tarefa.snapshot.downloadURL);
        this.imagem = tarefa.snapshot.downloadURL;
        this.htmlYouWantToAdd = '<img class="img ic" src="'+tarefa.snapshot.downloadURL+'"alt="Ícone"/>';
        this.i=this.i+1
      });
  }
}
