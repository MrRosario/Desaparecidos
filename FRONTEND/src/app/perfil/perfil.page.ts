import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { EditPerfilPage } from '../edit-perfil/edit-perfil.page';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dados: any = [];
  
  nome: string;
  email: string;
  localizacao: string;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public popoverController: PopoverController, 
              public modalController: ModalController,
              private alertController: AlertController) {  }

  ngOnInit() {
    this.usuario();
  }

  usuario(){
    const user = JSON.parse(localStorage.getItem('Usuario'));
      if(user){
        let id = user.results[0].UsuarioID;
        this.usrService.perfil(id).subscribe((resultado) => {
          this.dados = resultado;
          this.nome = this.dados[0].Nome + " " + this.dados[0].Sobre_nome;
          this.email = this.dados[0].Email;
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
