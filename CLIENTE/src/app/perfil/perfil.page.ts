import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { PopoverController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user = JSON.parse(localStorage.getItem('Usuario'));
  id = this.user.results[0].UsuarioID;

  dados: any = [];

  // this.usrService.perfil(this.id).subscribe((res:any) => {
  //   if(res != null){
  //     this.dados = res;
  //     console.log(this.dados);
  //   }  
  // });
  
  nome: string;
  email: string;
  userID: number;
  mostrar: boolean = false;

  constructor(private router: Router, 
      public usrService: UsuariosService, 
      public toastController: ToastController, 
      public modalController: ModalController,
      private alertController: AlertController,
      public popoverController: PopoverController
    ) {  }

  ngOnInit() {
    this.usuario();
  }

  mostrarBtnEdit(){
    this.mostrar = !this.mostrar;
  }

  async modalEditarPerfil(){
    const modal = await this.modalController.create({
      component: EditUserPage,
      componentProps: { value: this.userID }
    });
    
    modal.onDidDismiss().then( () => {
      this.usuario();
    });

    return await modal.present();
  }

  usuario(){
    const user = JSON.parse(localStorage.getItem('Usuario'));
    const id = user.results[0].UsuarioID;
    
    this.usrService.perfilUsuario(id).subscribe( (res:any) => {
      if(res != null){
        console.log(res);
        this.nome = res[0].Nome + " " + res[0].Sobre_nome;
        this.email = res[0].Email;
        this.userID = res[0].UsuarioID;
      }
    });

    this.usrService.perfil(this.id).subscribe((res:any) => {
      if(res != null){
        this.dados = res;
        console.log(this.dados);
      }  
    });

  }
  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async excluirPost(PostID) {
    const alert = await this.alertController.create({
      message: 'Tem certeza que quer excluir a Publicação?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SIM',
          handler: () => {
            this.usrService.apagarPost(PostID).subscribe( (res:any) => {
              this.presentToast("Publicação excluida com sucesso!");
              this.usuario();
              console.log('success', res);
            })
            error =>{ console.log('Erro', error); }
          }
        }
      ]
    });
    await alert.present();
  }

  
  async presentModal(PostId) {
    const modal = await this.modalController.create({
      component: EditPerfilPage,
      componentProps: { value: PostId }
    });
    modal.onDidDismiss().then( () => {
      this.usuario();
    });

    return await modal.present();
  }

}
