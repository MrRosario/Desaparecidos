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

  usrDestinarioID:number = this._Activatedroute.snapshot.params['id'];

  user = JSON.parse(localStorage.getItem('Usuario'));
  meuID = this.user.results[0].UsuarioID.toString();

  mensagem: string;
  lista: any = [];
  Nome: string;
  myName: string;
  outraLista: string;

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private _router: Router, 
    public usrService: UsuariosService) { }

  ngOnInit() {
    
    console.log(typeof(this.meuID));
    console.log(typeof(this.usrDestinarioID));
    
    //Retorna usuario e exibe na header
    this.usrService.getPerfilEdit(this.usrDestinarioID).subscribe( (res:any) =>{
      //console.log(res);
      this.Nome = `${res[0].Nome} ${res[0].Sobre_nome}`; 
    });

    //Retorna meu usuario
    this.usrService.getPerfilEdit(this.meuID).subscribe( (res:any) =>{
      console.log(res);
      this.myName = `${res[0].Nome} ${res[0].Sobre_nome}`;
      console.log(this.myName);
    });

    let ref = firebase.database().ref();
    
    console.log(this.usrDestinarioID)
    // this.usrService.minhasMensagens(this.usrDestinarioID).subscribe((res:any) => {
    //   this.lista = res;
    //   console.log(res);
    //   this.scrollToBottom();
    // });

    this.usrService.mensagens().subscribe( (res:any) => {
      console.log(res);
      this.lista = res.filter( (elem) => {
        return elem.destinatario_Id == this.usrDestinarioID 
      })
    })
   
  }

  enviar(){
   
    let msg = {
      MeuNome: this.myName,
      myID: this.meuID,
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
