import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {

  Email: string;

  erroMSG: boolean = false;
  checkEmailBox: boolean = true;
  putEmailBox: boolean = false;

  Senha: string;
  VerificarSenha: string;

  dados: any = [];

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private _http: HttpClient,
    public usrService: UsuariosService,
    public modalController: ModalController, 
    private router: Router) { }

  ngOnInit() {
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async localizar(){
    const loading = await this.loadingController.create({
      message: 'Verificando...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.usrService.verificarEmail(this.Email).subscribe( (res)=>{
      this.dados = res;
      if(this.dados.length == 1){
        console.log(this.dados);
        loading.dismiss();
        this.checkEmailBox = false;
        this.putEmailBox = true;
        this.erroMSG = false;  
      }
      else if(this.dados.length == 0){
        console.log(this.dados);
        loading.dismiss();
        //this.presentToast('este email nao existe ok');
        this.erroMSG = true;
      }
    },(err) => {
      this.erroMSG = true;
      console.log(err);
      loading.dismiss()
    });
  }

  async criarSenha(){
    const loading = await this.loadingController.create({
      message: 'Verificando...',
      spinner: 'bubbles',
    });

    await loading.present();

    if(this.Senha != this.VerificarSenha){
      loading.dismiss();
      this.presentToast('As senha não combinam, tente novamente!');
    }
    else{
      console.log('senha iguais');
      let dado = {
        Senha: this.Senha,
        Email: this.Email,
      }
      this.usrService.criarNovaSenha(dado).subscribe( (data) => { 
        this.presentToast('Nova senha criada com sucesso!');
        console.log(data); 
        loading.dismiss();
        this.router.navigateByUrl('/login');
      },
      error => { 
        console.log('Erro', error); 
        loading.dismiss();
        this.presentToast('Erro ao criar senha!');
      }
    );
    }
  }
  // async termos(){
  //   const modal = await this.modalController.create({
  //     component: TermosPage
  //   });
  //   return await modal.present();
  // }
}
