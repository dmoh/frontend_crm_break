import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdService} from "@app/_services/ad.service";
import {Ad} from "@app/dashboard/models/ad";
import {AuthenticationService} from "@app/_services/authentication.service";
import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {
  ad: Ad = new Ad();
  messageByContact: string = '';
  apiLoaded: any;
  options: google.maps.MapOptions;
  marker: google.maps.Marker;
  interested: boolean;
  contact: any;
  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private http: HttpClient,
    private router: Router,
    private authentication: AuthenticationService) {
    /*this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDOmurdWZc_98jW1WCzrc15-c8SyQ_f9Wc', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );*/
  }

  ngOnInit(): void {
    this.interested = false;
    // this.apiLoaded = this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI('4 rue de l\'avenir 74300 Cluses') + '&key=AIzaSyDOmurdWZc_98jW1WCzrc15-c8SyQ_f9Wc')
    this.apiLoaded = this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI('Rue Pedro Meylan 1, 1208 Genève, Switzerland') + '&key=AIzaSyDOmurdWZc_98jW1WCzrc15-c8SyQ_f9Wc')
    this.apiLoaded.subscribe((res) => {
      const loc = res.results[0].geometry.location;
      const image =
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      this.marker = new google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        icon: image,
        animation: google.maps.Animation.BOUNCE
      });
      this.options = {
        center: new google.maps.LatLng(loc.lat, loc.lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    });
     // if (!this.authentication.currentUserValue.token) {
      // securite renforce hashage dynamique
    /*this.route.queryParams.subscribe(params => {
      const infos = decodeURIComponent(window.atob(params.infos)); // window.btoa(unescape(encodeURIComponent( 'email@sdsd.fr,id=5' )));
      this.adService.getAdById(params.idAd).subscribe((ad: Ad) => {
        this.ad = ad;
        console.log(ad);
      });
      /*const hInf = `dfmk11513SDS#+#${infos}`;
      const df = hInfos.split('#+#');
      console.log(df);
      const deco = decodeURIComponent(escape(window.atob( infos )));
      const decoH = decodeURIComponent(escape(window.atob( df[1] )));
      const fdf = hInfos.substr(15, 0);
      // const decoHreal = decodeURIComponent(escape(window.atob( hInfos.substr(0, 13) )));
      console.log(deco);
      console.log(fdf);
      // console.log(decoHreal);
      console.log(decoH);
    });*/
   // }
  }

  onChange($event) {
    this.interested = $event.option._selected;
    console.log(this.interested);
  }

  onValidate(): void {
    // Annonce concerné et contact concerné
    if (this.messageByContact.trim().length > 0 || this.interested === true) {
      const response = {
        isInterested: true,
        // mailContact: this.contact.email,
        mailContact: 'mkanoute74@gmail.com',
        messageLeft: this.messageByContact
      };
      this.adService.opinionCustomerAboutAd(1, JSON.stringify(response))
        .subscribe((res) => {
          // MODAL INFO
          // TODO VOIR SI LE CLIENT PEUX REVOIR L?ANNONCE OU REDIRECTION HOME
          if (res.ok) {
            this.router.navigateByUrl('https://brec.ch');
          }
        });
    }
  }
}
