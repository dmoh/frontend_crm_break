import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {crmConstants} from "@app/_helpers/crm-constants";
import {environment} from "@environments/environment";
import {Buyer} from "@app/_models/buyer";

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends GlobalHttpService {


  private buyerSubject = new BehaviorSubject(new Buyer());
  buyerCurrent = this.buyerSubject.asObservable();

  getBuyerList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/buyer/list`, {
     headers: this.headers
    }
    )
  }


  setBuyerCurrent(buyer) {
    this.buyerSubject.next(buyer)
  }

  getPotentialBuyerList(offer: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/potential/list`, {
        offer: offer
      }
    )
  }

  getAreaCodeCountry(country: string): Observable<any> {
    return this.http.get<any>(`${environment.frontendUrl}/assets/areas-code-country.json`
    )
  }




  updateBuyer(buyer): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/update`, {
        buyer: buyer
      }
    )
  }

}
