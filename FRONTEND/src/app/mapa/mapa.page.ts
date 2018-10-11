import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(private router: Router) { }

  ngOnInit() { this.loadMap(); }

  ionViewDidLoad(){  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-23.533773, -46.625290);

    let mapOptions = {
      center: latLng,
      zoom: 3,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  posicaoAtual() {
    
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }
}
