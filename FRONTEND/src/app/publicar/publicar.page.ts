import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { LoadingController, AlertController, ActionSheetController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  Titulo: string;
  Descricao: string;
  Visto_encontrado: string;
  Telefone: string;
  Email: string;

  imageSrc: string = null;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public loadingController: LoadingController,
              private alertController: AlertController,
              public actionSheetController: ActionSheetController,
              private camera: Camera) { }

  ngOnInit() { }

  takePicture(imageFrom){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options)
      .then((imageData) => {
        this.imageSrc = 'data:image/jpeg;base64,' + imageData;
        //alert(this.imageSrc);
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })  
  }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar fotos apartir da...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, 
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      content: '',
      spinner: 'bubbles',
      duration: 5000,
      translucent: true
    });
    return await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Cadastrado com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
  }

  Publicar(){

    // const user = JSON.parse(localStorage.getItem('Usuario'));
    // const IDusuario = user.results[0].UsuarioID;

    // let Publicacao = {
    //   Titulo: this.Titulo,
    //   Descricao: this.Descricao,
    //   Visto_encontrado: this.Visto_encontrado,
    //   Telefone: this.Telefone,
    //   Email: this.Email,
    //   Imagem1: this.Imagem1,
    //   Imagem2: this.Imagem2,
    //   Imagem3: this.Imagem3,
    //   UsuarioID: IDusuario,
    //   Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    // };

    // this.usrService.publicar(Publicacao) 
    // .subscribe(
    //   data =>  { this.presentAlert(); this.router.navigateByUrl('/home'); console.log('success', data); },
    //   error => { console.log('Erro', error); }
    // );
    //console.log(this.imagem);
  }

}
