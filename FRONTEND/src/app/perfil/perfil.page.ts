import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any = [];
  
  nome: string;
  email: string;
  localizacao: string;

  constructor(private router: Router, public usrService: UsuariosService,
              public popoverController: PopoverController) {

    const user = JSON.parse(localStorage.getItem('Usuario'));
      if(user){
        let id = user.results[0].UsuarioID;
        this.usrService.perfil(id).subscribe((resultado) => {
          this.dados = resultado;
          this.nome = this.dados[0].Nome + "" + this.dados[0].Sobre_nome;
          this.email = this.dados[0].Email;
          console.log(this.dados);
        });
      } 

  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
