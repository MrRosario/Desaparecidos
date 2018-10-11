import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuariosService } from '../api/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  @Input() value: any;

  Titulo: string;
  Descricao: string;
  Visto_encontrado: string;
  Telefone: string;
  Email: string;

  constructor(public modalController: ModalController, public usrService: UsuariosService,
              private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.usrService.getPostEdit(this.value).subscribe( res => {
      console.log(res)
      this.Titulo = res[0].Titulo;
      this.Descricao = res[0].Descricao;
      this.Visto_encontrado = res[0].Visto_encontrado;
      this.Telefone = res[0].Telefone;
      this.Email = res[0].Email;
    })
    console.log(this.value)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Atualizado com sucesso.',
      duration: 3000
    });
    toast.present();
  }

  Atualizar(){

    let Update = {
      Titulo: this.Titulo,
      Descricao: this.Descricao,
      Visto_encontrado: this.Visto_encontrado,
      Telefone: this.Telefone,
      Email: this.Email,
      PostID: this.value
    }

    this.usrService.atualizarPost(Update) 
    .subscribe(
      data =>  { 
        this.presentToast();
        this.modalController.dismiss(); 
        this.router.navigateByUrl('/perfil'); 
        console.log('success', data); 
      },
      error => { console.log('Erro', error); }
    );
  }
  dismiss(){
    this.modalController.dismiss();
  }

}
