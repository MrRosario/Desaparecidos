import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError  } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {


  dados: any = [];
  comentario: any = [];

  url: string = 'http://localhost:3000/';

  constructor(private _Activatedroute: ActivatedRoute, 
              private _router: Router, 
              private http: HttpClient,
              public usrService: UsuariosService) { }

  ngOnInit() {
    this.usrService.getPost(this._Activatedroute.snapshot.params['id'])
        .subscribe((resultado: any) => {
             this.dados = resultado;
             console.log(resultado);
        });
        
    this.usrService.getComentario(this._Activatedroute.snapshot.params['id'])
        .subscribe((resultado: any) => {
             this.comentario = resultado;
             console.log(resultado);
        });    
  }

  paginaAnterior(){
    this._router.navigateByUrl('/home');
  }
}
