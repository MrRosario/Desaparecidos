import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

  constructor(private _router: Router, public usrService: UsuariosService) { }

  ngOnInit() {
    this.usrService.listaUsuarios().subscribe( res => {
      console.log(res);
    })
  }

  paginaAnterior(){
    this._router.navigate(['/home']);
  }

}
