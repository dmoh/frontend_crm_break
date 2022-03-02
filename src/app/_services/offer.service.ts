import { Injectable } from '@angular/core';
import { Ad } from '@app/dashboard/models/ad';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Offer} from "@app/_models/offer";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OfferService extends GlobalHttpService{

  public offers$: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  offers: any[];


  updateOffer(offer: Offer): Observable<any> {
      return this.http.post<any>(`${environment.baseApiUrl}/offer/update`, {
        offer: offer
      })
  }

  getOfferList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/offer/list`)
  }

  updateStatusOffer(id: number, status: number): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/offer/status/update/${id}`, {
      status: status
    })
  }


  getSaleList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/sale/list`)
  }

  addOffer(offer:any): void {
    const value = this.offers$.value;
    this.offers$.next([...value, offer])
  }

  deleteTask(id) {
    const value = this.offers$.value;
    this.offers$.next(value.filter(offer => offer.id != id));
  }


  getOfferArchiveList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/offer/archive/list`)
  }


}
