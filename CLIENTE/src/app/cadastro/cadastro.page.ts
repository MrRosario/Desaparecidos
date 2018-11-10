import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, } from '@ionic/angular';
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

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private _http: HttpClient,
    private _router: Router,
    public usrService: UsuariosService,
    private router: Router) { }

  ngOnInit() {  }


  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async cadastrar(){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });

    await loading.present();

    let usuario = {
      Nome: this.nome,
      Sobre_nome: this.sobre_nome,
      Email: this.email,
      Senha: this.senha,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    console.log(JSON.stringify(usuario));

    this.usrService.cadastrar(usuario) 
    .subscribe( data => { 
      loading.dismiss();
      this.presentToast('Cadastrado com sucesso'); 
      console.log('success', data); 
    },
    (error) => { 
      loading.dismiss();
      this.presentToast('Erro ao fazer o cadastro');
      console.log('Erro', error); 
    });
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }

}
