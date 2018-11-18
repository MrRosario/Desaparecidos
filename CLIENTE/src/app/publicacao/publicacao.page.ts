import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {

  @ViewChild('comment_input') commentInput: ElementRef;

  dados: any = [];

  comments: any = [];

  comentario: string;

  usrDestID: number;

  LoggedIn: boolean = false;

  slideOpts = {
    effect: 'slide',
    speed: 300
  };

  Imagens: any = [];
  
  constructor(private _Activatedroute: ActivatedRoute, 
              private _router: Router, 
              private http: HttpClient,
              public usrService: UsuariosService, activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.usrDestID);

    const user = JSON.parse(localStorage.getItem('Usuario'));
        
    if(user){
      this.LoggedIn = true;
     }

    this.usrService.getPost(this._Activatedroute.snapshot.params['id'])
      .subscribe((resultado: any) => {
          this.dados = resultado;
          this.usrDestID = resultado[0].Usuario;
          this.Imagens.push(resultado[0].Imagem1);
          this.Imagens.push(resultado[0].Imagem2);
          this.Imagens.push(resultado[0].Imagem3);
          
          console.log(resultado);
          console.log(this.Imagens);

          let index = this.Imagens.indexOf('');

          if (index > -1) {
            this.Imagens.splice(index, 2);
          }
          
          console.log(this.Imagens);
          console.log(resultado);
      });

    this.obterComentario();
    this.caixaComentario();

    let x = document.querySelector("#comment_input");
    if (x){
        x.scrollIntoView();
    }
  }

  caixaComentario(){
    if (this.commentInput && this.commentInput.nativeElement) {
      this.commentInput.nativeElement.focus();
      console.log('Focus funcionando');
    }
  }

  private obterComentario(){
    return this.usrService.getComentario(this._Activatedroute.snapshot.params['id'])
          .subscribe((resultado: any) => {
           this.comments = resultado;
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
