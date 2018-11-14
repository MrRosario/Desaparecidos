import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import AuthProvider = firebase.auth.AuthProvider;
import 'firebase/storage';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://localhost:3000/api/';

  constructor(
    private _http: HttpClient,
    private fb: FirebaseApp, 
    private afDB: AngularFireDatabase) { }

  enviarMensagem(dados){
    const user = JSON.parse(localStorage.getItem('Usuario'));
    const myID = user.results[0].UsuarioID;

    return this.afDB.list(`/Chat/`).push({
      MeuNome: dados.MeuNome,
      texto: dados.texto,
      meuID: myID,
      destinatario_Id: dados.destinario_Id,
      dataEnvio: dados.dataEnvio
    });
  }

  listaUsuarios(){

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const myID = user.results[0].UsuarioID;

    return this.afDB.list(`/chat`).valueChanges();
  }

  minhasMensagens(destinatariID){
    console.log("Destinatario" + destinatariID);
    return this.afDB.list(`/chat`, ref => 
      ref
        .orderByChild('destinario_Id')
        .equalTo(destinatariID)
      ).valueChanges();
  }

  // mensagensRecebidas(meuID){
  //   console.log("Eu: " + meuID);
  //   return this.afDB.list(`/chat/`, ref => 
  //     ref
  //       .orderByChild('destinario_Id')
  //       .equalTo(meuID)
  //     ).valueChanges();
  // }

  mensagensTrocadas(otherUserId){
    const user = JSON.parse(localStorage.getItem('Usuario'));
    const myID = user.results[0].UsuarioID;

    let ref = firebase.database().ref();

    ref.child(`/chat/${myID}`).on('child_added', (snapshot) => {
      //console.log(snapshot.val());
      // let eu = snapshot.val();
      // let dataEnvio = eu.dataEnvio;

      ref.child(`/chat/${otherUserId}`).orderByChild("destinario_Id").equalTo(otherUserId)
        .on('child_added', (snap) => {
          //return console.log(snapshot.val());
          return console.log(snap.val());
      });
    });
  }
  
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
    return this._http.delete(this.url + 'excluir/' + id, httpOptions);
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

  publicar(dados, ArrayImagens){

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const myID = user.results[0].UsuarioID;
    
    return ArrayImagens.forEach(element => {

      let Publicacao = {
        Titulo: dados.Titulo,
        Descricao: dados.Descricao,
        Visto_encontrado: dados.Visto_encontrado,
        Telefone: dados.Telefone,
        Email: dados.Email,
        Imagem1: '',
        Imagem2: '',
        Imagem3: '',
        UsuarioID: dados.IDusuario,
        Criado_aos: dados.Criado_aos
      };
  
      let storageRef = this.fb.storage().ref();
      let basePath = '/ImagensPosts/' + myID;
  
      let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
      let uploadTask = storageRef.child(Caminho).putString(element,'data_url', { contentType: 'image/jpeg' });
      
      
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }    
        },(error) => {
              //reject(error);
              console.log(error)
        },() => { 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            Publicacao.Imagem1 = downloadURL;
            console.log('1: ', downloadURL);
            console.log('2: ', downloadURL);
            //Publicacao.Imagem2 = downloadURL;
            //Publicacao.Imagem3 = downloadURL;
            //console.log('File available at', downloadURL);
          });
          
          setTimeout( () => {
            console.log(Publicacao.Imagem1);
            this._http.post(this.url + 'publicar/', Publicacao, httpOptions);
            //resolve(uploadTask.snapshot);
          }, 2000);

        }); 
    });   
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
