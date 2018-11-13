import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { Events, Content } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  usrDestinarioID = this._Activatedroute.snapshot.params['id'];
  mensagem: string;
  lista: any = [];
  Nome: string;
  MeuNome: string;
  constructor(
    private _Activatedroute: ActivatedRoute, 
    private _router: Router, 
    public usrService: UsuariosService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('Usuario'));
    const meuID = user.results[0].UsuarioID;
  
    //Retorna usuario e exibe na header
    this.usrService.getPerfilEdit(this.usrDestinarioID).subscribe( (res:any) =>{
      //console.log(res);
      this.Nome = `${res[0].Nome} ${res[0].Sobre_nome}`; 
    });

    //Retorna meu usuario
    this.usrService.getPerfilEdit(meuID).subscribe( (res:any) =>{
      //console.log(res);
      this.MeuNome = `${res[0].Nome} ${res[0].Sobre_nome}`;
    });

    let ref = firebase.database().ref();
    
    console.log(this.usrDestinarioID)
    // this.usrService.minhasMensagens(this.usrDestinarioID).subscribe((res:any) => {
    //   this.lista = res;
    //   console.log(res);
    //   this.scrollToBottom();
    // });

    // this.usrService.mensagensRecebidas(meuID).subscribe((res:any) => {
    //   //this.lista = res;
    //   console.log(res);
    //   this.scrollToBottom();
    // });

    console.log('Meu Id: ' + meuID);
    
    //Mensgens Enviadas
    ref.child(`/Chat/`).orderByChild("destinatario_Id").equalTo(meuID)
      .on('child_added', (snapshot) => {
        console.log(snapshot.val());
    });
    //Mensagens Recebidas
    // ref.child(`/Chat/`).orderByChild("destinatario_Id").equalTo(this.usrDestinarioID)
    //   .on('child_added', (snap) => {
    //     console.log(snap.val());
    // });
  }

  enviar(){
    let msg = {
        MeuNome: this.MeuNome,
        texto: this.mensagem,
        destinario_Id: this._Activatedroute.snapshot.params['id'],
        dataEnvio: new Date().toISOString()   
    }

    this.usrService.enviarMensagem(msg).then( () => {
      this.scrollToBottom();
      this.mensagem = "";
      console.log('Mensagem enviada com sucesso');
    },(err)=>{
      console.log('erro ao enviar mensagem')
    })

  }
  onFocus() {
    //this.content.resize();
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 100)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  // paginaAnterior(){
  //   console.log(this.usrDestID);
  //   this._router.navigate(['/publicacao/' + this.usrDestID]);
  // }
}
