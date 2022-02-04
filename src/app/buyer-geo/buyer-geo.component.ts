import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {GoogleMap, MapAnchorPoint, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProspectService} from "@app/_services/prospect.service";
import {MatSnackBar} from "@angular/material/snack-bar";

declare var google: any;

@Component({
  selector: 'app-buyer-geo',
  templateUrl: './buyer-geo.component.html',
  styleUrls: ['./buyer-geo.component.scss']
})
export class BuyerGeoComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  markers = [];
  prospects = [];
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoMap: MapInfoWindow
  zoom = 17;
  addressInit: string = '';
  info: any;
  infoContent = '';

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 45,
    minZoom: 8
  }

  private geocoder: any;
  private isInitMap: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private prospectService: ProspectService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.geocoder = new google.maps.Geocoder();
    this.addressInit = this.data.address;
    this.info = this.data.info;

    //this.geocoder.geocode({address: '' })
  }

  ngOnInit(): void {
    /* this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDwdzw_4LBFhmY_Xe5zyrujucx-9MDTdLc', 'callback')
       .pipe(
         map(() => true),
         catchError(() => of(false)),
       );*/

    /*navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    console.log(this.center);*/
    this.prospectService.findProspectByLocation(this.info)
      .subscribe((res) => {
        if (res.prospects) {
          this.prospects = res.prospects;
          this.prospects.forEach((elem) => {
            const address = `${elem.street}, ${elem.city}`;
            this.codeAddress(address, elem);
          });
        }
      });
    this.codeAddress(this.addressInit);


  }

  addMarker(lat: string, long: string, prospect?: any) {
    if (this.isInitMap) {
      this.center = new google.maps.LatLng(+lat, +long);
      this.isInitMap = false;
    }

    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };

    const icon = "http://localhost:4200/assets/images/shop.png"
    const infoMessage = prospect ?
      `<div style="padding: 2rem; font-size: x-large; color: #007bff">
            ${prospect.owners}
                <br>
                <div style="color: #666666; font-style: italic; font-size: small">
                ${prospect.street}</div>
        </div>` : 'NO INFO';
    this.markers.push({
      position: {
        lat: lat,
        lng: long,
      },
      label: {
        color: prospect ? 'gold' : 'green',
        text: `Proprio: ${prospect ? prospect.owners : this.info.owners}`,
      },
      info: infoMessage,
      title: `Proprio: ${prospect ? prospect.owners : this.info.owners}`,
      options: {
        animation: google.maps.Animation.BOUNCE,
        icon:
            prospect ? svgMarker : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      },
    });

  }


  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  codeAddress(address, prospect?: any) {
    this.geocoder.geocode({address: address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        console.warn('result Geocode', [latitude, longitude]);

        setTimeout(() => {
          if (prospect) {
            this.addMarker(latitude, longitude, prospect);
          } else {
            this.addMarker(latitude, longitude);
          }
        }, 1000)
        //center the map over the result
        //place a marker at the location
        /*var marker = new google.maps.Marker(
          {
            map: this.map,
            position: results[0].geometry.location
          });*/
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.infoMap.open(marker);
    // this.snackBar.open(marker.marker.title, 'ok');
    console.warn(content);
  }

  click($event: google.maps.MouseEvent | google.maps.IconMouseEvent) {
    console.warn($event);
  }
}
