import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios: any = [];
  private sub: Subscription;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              private socialSharing: SocialSharing) { 
    usrService.todosPosts().subscribe((resultado) => {
      this.usuarios = resultado;
      console.log(resultado);
    });
  }

  compartilhar(Mensagem, Titulo, id){
    this.socialSharing.share(Mensagem, Titulo, `localhost:8100/publicacao/${id}`).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  detalhes(id){
    console.log(id);
    this.router.navigate(['/publicacao/' + id]);
  }
  comentar(id, idName: string):void{

    this.router.navigate(['/publicacao/' + id ]);
    console.log(idName);
   
  }
}
