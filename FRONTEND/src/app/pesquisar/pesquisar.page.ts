import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  
  dados: any = [];

  constructor(private router: Router, public usrService: UsuariosService) { }

  ngOnInit() {
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  onSearchType(value: any) {
    if(value !== ""){
      this.usrService.getPesquisar(value)
        .subscribe((resultado: any) => {
          this.dados = resultado;
          console.log(resultado);
        });
    } 
    else {
      this.dados = []
    }
  }

  detalhes(id){
    this.router.navigate(['/publicacao/' + id]);
  }
}
