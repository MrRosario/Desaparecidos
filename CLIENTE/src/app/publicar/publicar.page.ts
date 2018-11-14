import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { LoadingController, AlertController, ActionSheetController, ToastController} from '@ionic/angular';
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

  index: number = 0;
  ArrayImagens: any = [];

  constructor(
    private router: Router, 
    private usrService: UsuariosService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private camera: Camera) { }

  ngOnInit() { }

  onSelectFile(event) { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
         
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageSrc = event.target.result;
        this.ArrayImagens[0] = event.target.result;
        console.log(this.ArrayImagens);
      }
    }
  } 

  onSelectFile2(event) { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
         
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageSrc1 = event.target.result;
        this.ArrayImagens[1] = event.target.result;
        console.log(this.ArrayImagens);
      }
    }
  } 

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
        this.ArrayImagens[0] = base64Image;
    },(err) => {
      console.error(err);
    });
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
        this.ArrayImagens[1] = base64Image;
    },(err) => {
      console.error(err);
    });
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
        this.ArrayImagens[2] = base64Image;
    },(err) => {
      console.error(err);
    });
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

  async Publicar(){
  
    const loading = await this.loadingController.create({
      message: 'Cadastrando...',
      spinner: 'bubbles',
    });
    await loading.present();

    const user = JSON.parse(localStorage.getItem('Usuario'));
    const IDusuario = user.results[0].UsuarioID;

    let Publicacao = {
      Titulo: this.Titulo,
      Descricao: this.Descricao,
      Visto_encontrado: this.Visto_encontrado,
      Telefone: this.Telefone,
      Email: this.Email,
      Imagem1: '',
      Imagem2:  '',
      Imagem3:  '',
      UsuarioID: IDusuario,
      Criado_aos: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    this.usrService.publicar(Publicacao, this.ArrayImagens).then( (data) => { 
      loading.dismiss();
      this.presentToast('Cadastro feito com sucesso!');
      this.router.navigateByUrl('/home'); 
      console.log('success', data); 
    },(error) => { 
      loading.dismiss();
      this.presentToast('Erro ao fazer o cadastro!');
      console.log('Erro', error); 
    });
  }

}
