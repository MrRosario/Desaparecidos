import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UsuariosService } from '../api/usuarios.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  @Input() value: any;

  Nome: string;
  SobreNome: string;
  Email: string;
  Localizacao: string;

  constructor(public modalController: ModalController, 
              public usrService: UsuariosService, 
              public toastController: ToastController, 
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.usrService.getPerfilEdit(this.value).subscribe( res => {
      console.log(res)
      this.Nome = res[0].Nome;
      this.SobreNome = res[0].Sobre_nome;
      this.Email = res[0].Email;
    })
    console.log(this.value)
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async Atualizar(){

    let Update = {
      Nome: this.Nome,
      Sobre_nome: this.SobreNome,
      Email: this.Email,
      UsuarioID: this.value
    }

    const loading = await this.loadingController.create({
      content: 'Carregando',
      spinner: 'bubbles'
    });
    await loading.present();

    await this.usrService.atualizarPerfil(Update) 
    .subscribe( data =>  
      { 
        this.presentToast('Atualizado com sucesso!!');
        this.modalController.dismiss(); 
        console.log(data); 
        loading.dismiss();
      },
      error => { 
        console.log('Erro', error); 
        loading.dismiss();
        this.presentToast('Erro ao atualizar!');
      }
    );
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
