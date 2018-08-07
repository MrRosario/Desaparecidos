import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios: any = [];

  constructor(private router: Router, public usrService: UsuariosService) { 
    usrService.todosPosts().subscribe((resultado) => {
      this.usuarios = resultado;
      console.log(resultado);
    })
  }

  proximaPagina(){
    this.router.navigateByUrl('/perfil');
  }

  detalhes(id){
    console.log(id);
    this.router.navigate(['/publicacao/' + id]);
  }
  
}
