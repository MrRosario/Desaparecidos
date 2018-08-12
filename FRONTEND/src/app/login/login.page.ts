import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(private router: Router, public usrService: UsuariosService) { }

  ngOnInit() { }

  acessarComConta(){
    this.usrService.login(this.email, this.senha)
        .subscribe( 
          data => { 
            this.router.navigate(['/home' ]); 
            console.log('successo', data); 
          },
          error => { 
            console.log('Erro', error); 
          }
    );
  }

  criarConta(){
    this.router.navigateByUrl('/cadastro');
  }
  acessoSemConta(){
    this.router.navigateByUrl('/home');
  }
}
