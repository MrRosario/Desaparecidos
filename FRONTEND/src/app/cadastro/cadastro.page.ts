import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController} from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nome: string;
  sobre_nome: string;
  email: string;
  senha: string;

  constructor(public loadingController: LoadingController,
              private alertController: AlertController,
              private _http: HttpClient,
              private _router: Router,
              public usrService: UsuariosService,
              private router: Router) { }

  ngOnInit() {  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      content: '',
      spinner: 'bubbles',
      duration: 5000,
      translucent: true
    });
    return await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Cadastrado com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
  }

  cadastrar(){

    let usuario = {
      Nome: this.nome,
      Sobre_nome: this.sobre_nome,
      Email: this.email,
      Senha: this.senha,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    //console.log(usuario);
    console.log(JSON.stringify(usuario));

    //  const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/api/cadastrar');
    //        headers.append('Access-Control-Allow-Credentials', 'true');

    this.usrService.cadastrar(usuario) 
    .subscribe(
      data =>  { this.presentAlert(); console.log('success', data); },
      error => { console.log('Erro', error); }
    );
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }

}
