import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {

  dados: any = [];

  comments: any = [];

  comentario: string;

  usrDestID: number;

  constructor(private _Activatedroute: ActivatedRoute, 
              private _router: Router, 
              private http: HttpClient,
              public usrService: UsuariosService, activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obterPosts();
    this.obterComentario();
  }

  private obterComentario(){
    return this.usrService.getComentario(this._Activatedroute.snapshot.params['id'])
          .subscribe((resultado: any) => {
           this.comments = resultado;
           console.log(resultado);
    });   
  }

  private obterPosts(){
    this.usrService.getPost(this._Activatedroute.snapshot.params['id'])
        .subscribe((resultado: any) => {
             this.dados = resultado;
             this.usrDestID = resultado[0].Usuario;
             console.log(resultado);
        });
  }

  paginaAnterior(){
    this._router.navigateByUrl('/home');
  }

  comentar(){
    const user = JSON.parse(localStorage.getItem('Usuario'));
    const IDusuario = user.results[0].UsuarioID;
    const PostId = this.dados[0].PostId;

    let dadosComentario = {
      Comentario: this.comentario,
      PostId: PostId,
      UsuarioID: IDusuario,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    
    this.usrService.postComentario(dadosComentario) 
    .subscribe( 
      data =>  { console.log('success', data); this.comentario = ""; this.obterComentario(); },
      error => { console.log('Erro', error); }
    );

    console.log(dadosComentario);
  }

  chat(){
    console.log(this.usrDestID);
    this._router.navigate(['/chat/' + this.usrDestID]);
  }

}
