import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { LoadingController, AlertController, ActionSheetController, ToastController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import AuthProvider = firebase.auth.AuthProvider;
import 'firebase/storage';

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

  imageSrc: string;
  imageSrc1: string;
  imageSrc2: string;

  index: number = 0;
  ArrayImagens: any = [];

  user:any = JSON.parse(localStorage.getItem('Usuario'));
  myID:any = this.user.results[0].UsuarioID;
    
  ImagensRef = ['','','']; 

  constructor(
    private router: Router, 
    private usrService: UsuariosService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private fb: FirebaseApp, 
    private camera: Camera) { }

  ngOnInit() { }

  // onSelectFile(event) { 
  //   let that = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
         
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.imageSrc = event.target.result;
  //       this.ArrayImagens[0] = event.target.result;

  //       let storageRef = this.fb.storage().ref();
  //       let basePath = '/ImagensPosts/' + this.myID;
  //       let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
  //       let uploadTask = storageRef.child(Caminho).putString(this.imageSrc,'data_url', { contentType: 'image/jpeg' });
        
  //       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
  //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case firebase.storage.TaskState.PAUSED: // or 'paused'
  //             console.log('Upload is paused');
  //             break;
  //           case firebase.storage.TaskState.RUNNING: // or 'running'
  //             console.log('Upload is running');
  //             break;
  //         }    
  //       },(error) => {
  //           //reject(error);
  //           console.log(error)
  //         },() => { 
  //           uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //             that.ImagensRef[0] = downloadURL;
  //             console.log(that.ImagensRef);
  //             console.log('Imagem carregada com sucesso');
  //             console.log(downloadURL);
  //           });
  //           //resolve(uploadTask.snapshot);
  //         });  
  //     }
  //   }
  // } 

  // onSelectFile2(event) { 
  //   let that = this;
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
         
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.imageSrc1 = event.target.result;
  //       this.ArrayImagens[1] = event.target.result;
        
  //       let storageRef = this.fb.storage().ref();
  //       let basePath = '/ImagensPosts/' + this.myID;
  //       let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
  //       let uploadTask = storageRef.child(Caminho).putString(this.imageSrc1,'data_url', { contentType: 'image/jpeg' });
        
  //       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
  //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case firebase.storage.TaskState.PAUSED: // or 'paused'
  //             console.log('Upload is paused');
  //             break;
  //           case firebase.storage.TaskState.RUNNING: // or 'running'
  //             console.log('Upload is running');
  //             break;
  //         }    
  //       },(error) => {
  //           console.log(error)
  //         },() => { 
  //           uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //             that.ImagensRef[1] = downloadURL;
  //             console.log(that.ImagensRef);
  //             console.log('Imagem carregada com sucesso');
  //             console.log(downloadURL);
  //           });
  //         });  
  //     }
  //   }
  // } 

  takePicture(imageFrom){

    let that = this;
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc = base64Image;
        this.ArrayImagens[0] = base64Image;

        let storageRef = this.fb.storage().ref();
        let basePath = '/ImagensPosts/' + this.myID;
        let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
        let uploadTask = storageRef.child(Caminho).putString(this.imageSrc,'data_url', { contentType: 'image/jpeg' });
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }    
        },(error) => {
            //reject(error);
            console.log(error)
          },() => { 
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              that.ImagensRef[0] = downloadURL;
              console.log(that.ImagensRef);
              console.log('Imagem carregada com sucesso');
              console.log(downloadURL);
            });
            //resolve(uploadTask.snapshot);
          });  
    },(err) => {
      console.error(err);
    });
  }
  
  takePicture1(imageFrom){
    
    let that = this;

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc1 = base64Image;
        this.ArrayImagens[1] = base64Image;

        let storageRef = this.fb.storage().ref();
        let basePath = '/ImagensPosts/' + this.myID;
        let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
        let uploadTask = storageRef.child(Caminho).putString(this.imageSrc1,'data_url', { contentType: 'image/jpeg' });
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }    
        },(error) => {
            console.log(error)
          },() => { 
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              that.ImagensRef[1] = downloadURL;
              console.log(that.ImagensRef);
              console.log('Imagem carregada com sucesso');
              console.log(downloadURL);
            });
          });  

    },(err) => {
      console.error(err);
    });
  }
  
  takePicture2(imageFrom){

    let that = this;

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc2 = base64Image;
        this.ArrayImagens[2] = base64Image;

        let storageRef = this.fb.storage().ref();
        let basePath = '/ImagensPosts/' + this.myID;
        let Caminho = basePath + '/' + 'Post-' + new Date().getTime() + '.jpg';
        let uploadTask = storageRef.child(Caminho).putString(this.imageSrc2,'data_url', { contentType: 'image/jpeg' });
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }    
        },(error) => {
            console.log(error)
          },() => { 
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              that.ImagensRef[2] = downloadURL;
              console.log(that.ImagensRef);
              console.log('Imagem carregada com sucesso');
              console.log(downloadURL);
            });
          });  

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
    
    if(this.Titulo == undefined || this.Descricao == undefined || this.Visto_encontrado == undefined || 
      this.Telefone == undefined || this.Email == undefined || this.imageSrc == null){
      this.presentToast("Por favor preencha todos os campos e carregue pelo menos uma imagem");
    }
    else{
      const loading = await this.loadingController.create({
        message: 'Publicando...',
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
  
      Publicacao.Imagem1 = this.ImagensRef[0];
      Publicacao.Imagem2 = this.ImagensRef[1];
      Publicacao.Imagem3 = this.ImagensRef[2];
  
      console.log(Publicacao.Imagem1);
      console.log(Publicacao.Imagem2);
      console.log(Publicacao.Imagem3);
  
      this.usrService.publicar(Publicacao).subscribe( (data) => { 
        loading.dismiss();
        this.presentToast('Publicação feita com sucesso!');
        this.router.navigateByUrl('/home');
        console.log('success', data); 
      },
      (error) => { 
        loading.dismiss();
        this.presentToast('Erro ao fazer o cadastro!');
        console.log('Erro', error); 
      });
    }
  }

}
