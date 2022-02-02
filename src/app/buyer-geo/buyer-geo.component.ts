import {Component, Inject, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
declare var google: any;

@Component({
  selector: 'app-buyer-geo',
  templateUrl: './buyer-geo.component.html',
  styleUrls: ['./buyer-geo.component.scss']
})
export class BuyerGeoComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  private geocoder: any;
  constructor(private httpClient: HttpClient/*, @Inject()*/) {
    this.geocoder = new google.maps.Geocoder();
    // this.geocoder.geocode({address: })
  }

  ngOnInit(): void {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDwdzw_4LBFhmY_Xe5zyrujucx-9MDTdLc', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

}
