import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "@environments/environment";
import {Buyer} from "@app/_models/buyer";

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends GlobalHttpService {


  private buyerSubject = new BehaviorSubject(new Buyer());
  private drawerOpenSubject = new BehaviorSubject(false);
  buyerCurrent = this.buyerSubject.asObservable();
  drawer = this.drawerOpenSubject.asObservable();

  getBuyerList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/buyer/list`, {
     headers: this.headers
    })
  }


  setStateDrawer(stateOpen: boolean) {
    this.drawerOpenSubject.next(stateOpen);
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


  changeStateBuyers(buyers: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/state/update`, {
        prop: buyers
      }
    )
  }


  changeState(buyers: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/change/state`, {
        prop: buyers
      }
    )
  }

  searchBuyersByParams(params: any) {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/search`, {
        params: params
      }
    )
  }


  removeAgentBuyer(agent: any, buyer: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/buyer/agent/remove`, {
        agentId: agent.id,
        buyerId: buyer.id
      }
    )
  }

  getRoleUserCurrent() {
    return this.http
      .get<any>(`${environment.baseApiUrl}/user/role`, {headers: this.headers});
  }
}
