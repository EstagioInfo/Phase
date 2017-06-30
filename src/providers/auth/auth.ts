import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {}


  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, name:string, institute: string, curse: string, turma:string, imagem: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/cadastro').child(newUser.uid).set({
          email: email,
          nome: name,
          instituicao: institute,
          curso: curse,
          turma: turma,
          imagem: imagem,
          id: newUser.uid
      });
    });
  }


  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

}
