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

  public appPages = [
    {
      title: 'Minhas publicações',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Pesquisar',
      url: '/pesquisar',
      icon: 'search'
    },
    {
      title: 'Publicar',
      url: '/publicar',
      icon: 'globe'
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

  bo(){
    window.open("http://www.ssp.sp.gov.br/servicos/pessoas_desaparecidas_foto.aspx",'_system', 'location=yes');
  }

  dicas(){
    window.open("http://www.ssp.sp.gov.br/servicos/pessoas_desaparecidas.aspx",'_system', 'location=yes');
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
