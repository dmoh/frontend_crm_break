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
  //offers$ = new Subject<Ad[]>();
  offers: any[];


  updateOffer(offer: Offer): Observable<any> {
      return this.http.post<any>(`${environment.baseApiUrl}/offer/update`, {
        offer: offer
      })
  }


  addOffer(offer:any): void {
    const value = this.offers$.value;
    this.offers$.next([...value, offer])
    //this.offers.push(offer)
    //this.offers$.next(this.offers)
    //console.log(this.offers$, 'offers$');

    //this.task.push(tdo);
    //this.emitTodo();
  }
  EditOffer(offerEdited: any) {
    const value = this.offers$.value;
    this.offers$.next(
      value.map((offer) => {

        if (offer.id === offerEdited.id) {

          return offerEdited
        }
        else {
          return offer;
        }
      })
    )
  }
  deleteTask(id) {
    const value = this.offers$.value;
    this.offers$.next(value.filter(offer => offer.id != id));
  }
}
