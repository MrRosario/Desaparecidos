import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuariosService } from './api/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  usuario = JSON.parse(localStorage.getItem('Usuario'));
  valor:boolean = false;

  if(usuario){
    //this.meuID = usuario.results[0].UsuarioID.toString();
    this.valor = true;
  }
  public appPages = [
    {
      title: 'Minhas publicações',
      url: '/perfil',
      icon: 'person',
      loggedIn: this.valor
    },
    {
      title: 'Pesquisar',
      url: '/pesquisar',
      icon: 'search',
      loggedIn: this.valor
    },
    {
      title: 'Publicar',
      url: '/publicar',
      icon: 'globe',
      loggedIn: this.valor
    },
    {
      title: 'Mapa',
      url: '/mapa',
      icon: 'map'
    }
  ];

  constructor(
    private platform: Platform, 
    private splashScreen: SplashScreen,
    public toastController: ToastController, 
    private statusBar: StatusBar, 
    public usrService: UsuariosService, 
    private router: Router, 
    public menuCtrl: MenuController
    ) {
        
        const user = JSON.parse(localStorage.getItem('Usuario'));
        //Bug porque local storage adiciona Usario mesmo quando nao ha email e senha
        //Corrigir depois

        if(user){ 
          this.router.navigate(['/home']);
        } else{
          this.router.navigate(['/login']);
        }

        this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.usrService.loginOut();
    this.router.navigate(['/login']);
    this.menuCtrl.close();
    console.log("Sai com sucesso!!!");
  }
  
  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  abrirPagina(pagina){
    const user = JSON.parse(localStorage.getItem('Usuario'));
    if(user){
      this.router.navigate([`${pagina}`]);
      console.log(pagina);
    }
    else if (pagina == '/mapa'){
      this.router.navigate(['/mapa']);
    }
    else if (pagina == '/pesquisar'){
      this.router.navigate(['/pesquisar']);
    }
    else{
      this.presentToast('Faça o login para acessar esta opção');
    }
  }

}
