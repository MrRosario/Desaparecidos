import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'; 
import { identifierModuleUrl } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://localhost:3000/api/';
  constructor(private _http: HttpClient) { }

  todosPosts(){
    return this._http.get(this.url, httpOptions);
  }

  getPost(id){
    return this._http.get(this.url + id, httpOptions);
  }
  perfil(id){
    return this._http.get(this.url + 'perfil/' + id, httpOptions);
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
  publicar(dados){
    return this._http.post(this.url + 'publicar/', dados, httpOptions);
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
