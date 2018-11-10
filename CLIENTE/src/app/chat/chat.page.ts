import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';
import { Events, Content } from '@ionic/angular';
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

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private _router: Router, public usrService: UsuariosService) {

     }

  ngOnInit() {
    this.usrService.minhasMensagens().subscribe((res:any) => {
      this.lista = res;
      console.log(res);
      this.scrollToBottom();
    });
  }

  enviar(){
    let msg = {
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
