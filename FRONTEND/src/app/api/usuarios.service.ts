import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://localhost:3000/api/';
  constructor(private _http: HttpClient) { }

  todosPosts(){
    return this._http.get(this.url);
  }

  getPost(id){
    return this._http.get(this.url + id);
  }

  getComentario(id){
    return this._http.get(this.url + 'comentarios/' + id);
  }
  
  postComentario(comentario){
    return this._http.post(this.url + 'comentar/', comentario);
  }

  cadastrar(dados){
    return this._http.post(this.url + 'cadastrar/', dados);
  }

  publicar(dados){
    return this._http.post(this.url + 'publicar/', dados);
  }
  
  login(email: string, senha: string){
    return this._http.post(this.url + 'login/', { Email: email, Senha: senha })
      .map((user) => {
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('Usuario', JSON.stringify(user));
        }

        return user;
    });
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
