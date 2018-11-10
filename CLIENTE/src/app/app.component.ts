import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuariosService } from './api/usuarios.service';
import { Router } from '@angular/router';

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

  constructor(private platform: Platform, private splashScreen: SplashScreen,
            private statusBar: StatusBar, public usrService: UsuariosService, 
            private router: Router, public menuCtrl: MenuController) {
        
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
  
}