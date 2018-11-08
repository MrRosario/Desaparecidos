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

  constructor(private router: Router, public usrService: UsuariosService,) {
    let that = this
    this.usrService.getPostMap().subscribe((res: any) => {
      //console.log(res);
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
              console.log(resultado);
              that.localizacao.push(resultado);
              console.log(that.localizacao);
            }
        });
      }
      console.log(this.localizacao);
    });
   }

  ngOnInit() {
    //this.loadMap();
    //console.log(this.localizacao);
  }
  

  loadMap(){

    let latLng = new google.maps.LatLng(-14.235004, -51.925282);

    let mapOptions = {
      center: latLng,
      zoom: 3,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // var locations = [
    //   ['Rio de Janeiro', -22.901449, -43.178921, 4],
    //   ['Sao Paulo', -23.550520, -46.633308, 5],
    //   ['Salvador Bahia', -12.977749, -38.501629, 3],
    //   ['Belo Horizonte', -19.917299, -43.934559, 2],
    //   ['Floripa', -27.594870, -48.548222, 1]
    // ];
    
    var infowindow = new google.maps.InfoWindow();
    
    var marker, i;

    let that = this;
    
    console.log(that.localizacao.length);

    for (i = 0; i < that.localizacao.length; i++) {  
  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(that.localizacao[i].lat, that.localizacao[i].long),
        map: this.map
      });
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(that.localizacao[i].Titulo);
          infowindow.open(Map, marker);
        }
      })(marker, i));

      google.maps.event.addDomListener(marker,'click',(function(marker, i) {
        return function() {
          console.log(that.localizacao[i].Imagem1)
        }
      })(marker, i));

    }
  }

  paginaAnterior(){
    this.router.navigateByUrl('/home');
  }
}
