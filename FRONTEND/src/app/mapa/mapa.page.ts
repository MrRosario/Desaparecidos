import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../api/usuarios.service';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private localizacao: any = [];

  constructor(private router: Router, public usrService: UsuariosService) { }

  ngOnInit() {
    
    let that = this
    this.usrService.getPostMap().subscribe((res: any) => {
      for(let i = 0; i < res.length; i++){
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': res[i].Visto_encontrado}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();

              var resultado = {
                id: res[i].PostId,
                Titulo: res[i].Titulo,
                Imagem: res[i].Imagem1,
                lat: latitude,
                long: longitude
              }
              that.localizacao.push(resultado);
            }
        });
      }
      console.log(this.localizacao);
    });
    
    setTimeout( () => {
      this.loadMap();
    },1000);
  }
  

  loadMap(){

    let latLng = new google.maps.LatLng(-14.235004, -51.925282);

    let mapOptions = {
      center: latLng,
      zoom: 3,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    let that = this;

    for (i = 0; i < that.localizacao.length; i++) {  
  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(that.localizacao[i].lat, that.localizacao[i].long),
        map: this.map,
        animation: google.maps.Animation.DROP
      });
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(`<img id="myPostIMG" style="width: 200px; height: 150px; object-fit: cover;" 
          src="${that.localizacao[i].Imagem}"> <p>${that.localizacao[i].Titulo}</p>`);
          infowindow.open(Map, marker);
        }
      })(marker, i));
    }
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }
}
