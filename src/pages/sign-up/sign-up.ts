import { Component, Inject  } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';
import { FirebaseApp } from 'angularfire2';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
 htmlYouWantToAdd;
 referencia;
 arquivo;
 public signupForm:FormGroup;
 public loading:Loading;
 imagem: string = "s";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public authProvider: AuthProvider, @Inject(FirebaseApp) fb: any) {
    
    this.referencia = fb.storage().ref();

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.required],
      institute: ['', Validators.required],
      turma: ['', Validators.required],
      curse: ['', Validators.required]
    });
  
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } 
    else {
      console.log(this.imagem);
      if(this.imagem =="s"){
        let alert = this.alertCtrl.create({
          title: 'É necessário escolher a imagem de perfil',
          buttons: ['Ok']
        });
        alert.present();
      }else{
      this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password,this.signupForm.value.name, this.signupForm.value.institute,this.signupForm.value.curse,this.signupForm.value.turma, this.imagem)
      .then(result => {
        this.loading.dismiss().then( () => {
        });

      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: "Usuário já existente",
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
      }
    }
  }

   atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];

    let caminho = this.referencia.child('usuario/'+this.arquivo.name);
      let tarefa = caminho.put(this.arquivo);

      tarefa.on('state_changed', (snapshot)=>{
         // Acompanha os estados do upload (progresso, pausado,...)
      }, error => {
         // Tratar possíveis erros
      }, () => {
         // Função de retorno quando o upload estiver completo  
         console.log(tarefa.snapshot.downloadURL);
        this.imagem = tarefa.snapshot.downloadURL;
        this.htmlYouWantToAdd = '<img class="img ic" src="'+tarefa.snapshot.downloadURL+'"alt="Ícone"/>';
      });
  }
}
