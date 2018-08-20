import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuariosService } from './api/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Publicar',
      url: '/publicar',
      icon: 'globe'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Pesquisar',
      url: '/pesquisar',
      icon: 'search'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Sair',
      url: '/login',
      icon: 'log-out'
    }

  ];

  public usuarioAtual: string;

  constructor(private platform: Platform, private splashScreen: SplashScreen,
            private statusBar: StatusBar, public usrService: UsuariosService, 
            private router: Router, public menuCtrl: MenuController) {

      this.initializeApp();

      const user = JSON.parse(localStorage.getItem('Usuario'));
      if(user){
        this.usuarioAtual = user.results[0].Nome;
        console.log(this.usuarioAtual);
      } else{
        console.log('Local storage vazio');
      }

      if(this.router.url == '/home'){
        usrService.verificarLogin().subscribe(res => {
          this.usuarioAtual = res;
          console.log(res);
        })
      }
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.usrService.loginOut();
    //this.router.navigate('/login');
    this.router.navigate(['/login']);
    this.menuCtrl.close();
  }
  
}