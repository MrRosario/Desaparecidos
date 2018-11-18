import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { ModalController } from '@ionic/angular';
import { TermosPage } from '../termos/termos.page';

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
  btnAtivo: boolean = false;

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private _http: HttpClient,
    public usrService: UsuariosService,
    public modalController: ModalController, 
    private router: Router) { }

  ngOnInit() {  }
  
  botao(evento){
    console.log(evento);
    this.btnAtivo = !this.btnAtivo;
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async cadastrar(){
    if(this.nome == undefined || this.sobre_nome == undefined || this.email == undefined || this.senha == undefined){
      this.presentToast('Por favor preencha todos os campos!')
    }else{
      const loading = await this.loadingController.create({
        message: 'Cadastrando...',
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
  
      this.usrService.cadastrar(usuario).subscribe( res => { 
        console.log('success', res); 
        this.usrService.login(usuario.Email, usuario.Senha).subscribe( (data:any) => {
          if(data.token){
            console.log('successo', data); 
            this.router.navigate(['/home' ]); 
            loading.dismiss();
          }
        });
      },
      (error) => { 
        loading.dismiss();
        this.presentToast('Erro ao fazer o cadastro');
        console.log('Erro', error); 
      });
    }
  }

  async termos(){
    const modal = await this.modalController.create({
      component: TermosPage
    });
    return await modal.present();
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }

}
