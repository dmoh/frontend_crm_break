import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Observable} from "rxjs";
import {crmConstants} from "@app/_helpers/crm-constants";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends GlobalHttpService {
  getBuyerList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/buyer/list`, {
     headers: this.headers
    }
    )
  }


  getPotentialBuyerList(offer: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/potential/list`, {
        offer: offer
      }
    )
  }

}
