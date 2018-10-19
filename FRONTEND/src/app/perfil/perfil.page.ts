import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
import { EditUserPage } from '../edit-user/edit-user.page';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any = [];
  
  nome: string;
  email: string;
  userID: number;
  localizacao: string;
  mostrar: boolean = false;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public popoverController: PopoverController, 
              public modalController: ModalController,
              private alertController: AlertController) {  }

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
    modal.onDidDismiss( ()=>{
      this.usuario();
    })

    return await modal.present();
  }

  usuario(){
    const user = JSON.parse(localStorage.getItem('Usuario'));
      if(user){
        let id = user.results[0].UsuarioID;
        this.usrService.perfil(id).subscribe((resultado) => {
          this.dados = resultado;
          this.nome = this.dados[0].Nome + " " + this.dados[0].Sobre_nome;
          this.email = this.dados[0].Email;
          this.userID = this.dados[0].UsuarioID;
          console.log(this.dados);
        });
      }
  }
  paginaAnterior(){
    this.router.navigateByUrl('/home');
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
            this.usrService.apagarPost(PostID).subscribe( 
            res => {
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
    modal.onDidDismiss( ()=>{
      this.usuario();
    })

    return await modal.present();
  }
}
