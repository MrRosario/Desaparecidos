import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { LoadingController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  Titulo: string;
  Descricao: string;
  Visto_encontrado: string;
  Telefone: string;
  Email: string;
  Imagem1: string = null;
  Imagem2: string = null;
  Imagem3: string = null;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public loadingController: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

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

  Publicar(){

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const IDusuario = user.results[0].UsuarioID;

    let Publicacao = {
      Titulo: this.Titulo,
      Descricao: this.Descricao,
      Visto_encontrado: this.Visto_encontrado,
      Telefone: this.Telefone,
      Email: this.Email,
      Imagem1: this.Imagem1,
      Imagem2: this.Imagem2,
      Imagem3: this.Imagem3,
      UsuarioID: IDusuario,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    this.usrService.publicar(Publicacao) 
    .subscribe(
      data =>  { this.presentAlert(); this.router.navigateByUrl('/home'); console.log('success', data); },
      error => { console.log('Erro', error); }
    );
  }

}
