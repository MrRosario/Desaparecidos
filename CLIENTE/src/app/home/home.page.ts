import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios: any = [];
  private sub: Subscription;
  sharedUrl: string = "https://facebook.com/"

  constructor(
    private router: Router, 
    public usrService: UsuariosService,
    private socialSharing: SocialSharing,
    public toastController: ToastController
    ) { 
    usrService.todosPosts().subscribe((resultado) => {
      this.usuarios = resultado;
      console.log(resultado);
    });
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  compartilhar(Mensagem){
    this.socialSharing.share(Mensagem, "Localização de pessoas", null, this.sharedUrl).then((data) => {
      // Success!
    }).catch(() => {
      this.presentToast("Erro ao compartilhar");
    });
  }

  detalhes(id){
    console.log(id);
    this.router.navigate(['/publicacao/' + id]);
  }

  comentar(id):void{
    this.router.navigate(['/publicacao/' + id ]);
    let x = document.querySelector("#comment_input");
    if (x){
        x.scrollIntoView();
    }
  }
  
}
