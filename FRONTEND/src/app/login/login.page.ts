import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public toastController: ToastController, 
              public loadingController: LoadingController) { }

  ngOnInit() { this.usrService.loginOut() }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async acessarComConta(){

    const loading = await this.loadingController.create({
      content: 'Carregando',
      spinner: 'bubbles'
    });
    await loading.present();

    this.usrService.login(this.email, this.senha)
        .subscribe( (data:any) => { 
            if(data.token){
              console.log('successo', data); 
              this.router.navigate(['/home' ]); 
              loading.dismiss();
            }
            else if(data.code == 204){
              this.presentToast("Email ou senha está errado!")
              console.log('successo', data); 
              loading.dismiss();
            }
            
          },
          error => { 
            console.log('Erro', error);
            loading.dismiss(); 
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
