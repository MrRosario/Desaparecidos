import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import AuthProvider = firebase.auth.AuthProvider;
import 'firebase/storage';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'https://desaparecido.herokuapp.com/api/'

  constructor(
    private _http: HttpClient,
    private fb: FirebaseApp, 
    private afDB: AngularFireDatabase) { }

  enviarMensagem(dados){
    return this.afDB.list(`/chat/`).push({
      MeuNome: dados.MeuNome,
      myID: dados.myID,
      texto: dados.texto,
      destinatario_Id: dados.destinario_Id,
      dataEnvio: dados.dataEnvio
    });
  }

  listaUsuarios(){

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const myID = user.results[0].UsuarioID;

    return this.afDB.list(`/chat`).valueChanges();
  }
  mensagens(){
    return this.afDB.list(`/chat`).valueChanges();
  }

  minhasMensagens(destinatariID){
    console.log("Destinatario" + destinatariID);
    return this.afDB.list(`/chat/`, ref => 
      ref
        .orderByChild('destinatario_Id')
        .equalTo(destinatariID)
      ).valueChanges();
  }

  mensagensRecebidas(meuID){
    console.log("Eu: " + meuID);
    return this.afDB.list(`/chat/`, ref => 
      ref
        .orderByChild('destinatario_Id')
        .equalTo(meuID)
      ).valueChanges();
  }

  // mensagensTrocadas(otherUserId){
  //   const user = JSON.parse(localStorage.getItem('Usuario'));
  //   const myID = user.results[0].UsuarioID;

  //   let ref = firebase.database().ref();

  //   ref.child(`/chat/${myID}`).on('child_added', (snapshot) => {
  //     //console.log(snapshot.val());
  //     // let eu = snapshot.val();
  //     // let dataEnvio = eu.dataEnvio;

  //     ref.child(`/chat/${otherUserId}`).orderByChild("destinario_Id").equalTo(otherUserId)
  //       .on('child_added', (snap) => {
  //         //return console.log(snapshot.val());
  //         return console.log(snap.val());
  //     });
  //   });
  // }
  
  todosPosts(){
    return this._http.get(this.url, httpOptions);
  }
  getPostMap(){
    return this._http.get(this.url + 'postMap/', httpOptions);
  }
  getPost(id){
    return this._http.get(this.url + id, httpOptions);
  }
  perfil(id){
    return this._http.get(this.url + 'perfil/' + id, httpOptions);
  }
  perfilUsuario(id){
    return this._http.get(this.url + 'perfilUsuario/' + id, httpOptions);
  }
  getComentario(id){
    return this._http.get(this.url + 'comentarios/' + id, httpOptions);
  }
  getPostEdit(id){
    return this._http.get(this.url + 'dadosPost/' + id, httpOptions);
  }
  getPerfilEdit(id){
    return this._http.get(this.url + 'dadosPerfil/' + id, httpOptions);
  }
  atualizarPost(dados){
    return this._http.put(this.url + "atualizarPost/", dados, httpOptions);
  }
  apagarPost(id){
    return this._http.delete(this.url + "excluir/" + id, httpOptions);
  }
  getPesquisar(pesquisa){
    return this._http.get(this.url + 'pesquisar/' + pesquisa, httpOptions)
  }
  atualizarPerfil(dados){
    return this._http.put(this.url + "atualizarPerfil", dados, httpOptions)
  }
  postComentario(comentario){
    return this._http.post(this.url + 'comentar/', comentario, httpOptions);
  }
  cadastrar(dados){
    return this._http.post(this.url + 'cadastrar/', dados, httpOptions);
  }

  publicar(dados){
    return this._http.post(this.url + 'publicar/', dados, httpOptions);
  }

  login(email: string, senha: string){
    return this._http.post(this.url + 'login/', { Email: email, Senha: senha })
      .pipe(
        map((user) => {
          if (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('Usuario', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  getToken() {
    return localStorage.getItem("Usuario")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }
  
  loginOut(){
    localStorage.removeItem('Usuario');
  }

  verificarLogin(){
    const user = JSON.parse(localStorage.getItem('Usuario'));
      if(user){
        return user.results[0].Nome;
      } else{
        return console.log('Local storage  esta vazio');
      }
  }

}
