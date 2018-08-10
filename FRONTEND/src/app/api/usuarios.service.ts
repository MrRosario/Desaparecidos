import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

}
