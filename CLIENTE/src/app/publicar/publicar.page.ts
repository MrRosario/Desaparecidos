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
  imageSrc1: string = null;
  imageSrc2: string = null;

  constructor(private router: Router, 
              public usrService: UsuariosService,
              public loadingController: LoadingController,
              private alertController: AlertController,
              public actionSheetController: ActionSheetController,
              private camera: Camera) { }

  ngOnInit() { }

  takePicture(imageFrom){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc = base64Image;
        //this.presentLoading();
    },(err) => {
      console.error(err);
    });
  }
  
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
         
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageSrc = event.target.result;
      }
    }
  } 
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar foto apartir da...",
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

  takePicture1(imageFrom){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc1 = base64Image;
        //this.presentLoading();
    },(err) => {
      console.error(err);
    });
  }
  
  async presentActionSheet1() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar foto apartir da...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture1(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture1(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  takePicture2(imageFrom){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc2 = base64Image;
        //this.presentLoading();
    },(err) => {
      console.error(err);
    });
  }
  
  async presentActionSheet2() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar foto apartir da...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture2(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture2(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer excluir a imagem?',
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
            this.imageSrc = null;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm1() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer excluir a imagem?',
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
            this.imageSrc1 = null;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer excluir a imagem?',
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
            this.imageSrc2 = null;
          }
        }
      ]
    });
    await alert.present();
  }
  
  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
      duration: 3000,
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

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const IDusuario = user.results[0].UsuarioID;

    let Publicacao = {
      Titulo: this.Titulo,
      Descricao: this.Descricao,
      Visto_encontrado: this.Visto_encontrado,
      Telefone: this.Telefone,
      Email: this.Email,
      Imagem1: this.imageSrc,
      Imagem2: this.imageSrc1,
      Imagem3: this.imageSrc2,
      UsuarioID: IDusuario,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    this.usrService.publicar(Publicacao) 
    .then(
      data =>  { this.presentAlert(); this.router.navigateByUrl('/home'); console.log('success', data); },
      error => { console.log('Erro', error); }
    );

  }

}
