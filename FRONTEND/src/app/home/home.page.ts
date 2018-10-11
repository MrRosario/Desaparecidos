import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios: any = [];
  private sub: Subscription;

  constructor(private router: Router, public usrService: UsuariosService) { 
    usrService.todosPosts().subscribe((resultado) => {
      this.usuarios = resultado;
      console.log(resultado);
    });
    //usrService.verificarLogin()
    console.log(this.router.url);
  }


  detalhes(id){
    console.log(id);
    this.router.navigate(['/publicacao/' + id]);
  }
  comentar(id, idName: string):void{

    this.router.navigate(['/publicacao/' + id ]);
    console.log(idName);
    //Redirecionamento pro elemento nao funciona 100%
    // try {
    //   setTimeout(() => {
    //     window.location.hash = idName;
    //     document.querySelector(idName).parentElement.scrollIntoView();
    //   },60);
    // } catch (e) { console.log(e)}
  }
}
