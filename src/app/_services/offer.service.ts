import { Injectable } from '@angular/core';
import { Ad } from '@app/dashboard/models/ad';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  public offers$: BehaviorSubject<Ad[]> = new BehaviorSubject([]);
  //offers$ = new Subject<Ad[]>();
  offers: any[];

  constructor() {
    //this.offers = [];
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
