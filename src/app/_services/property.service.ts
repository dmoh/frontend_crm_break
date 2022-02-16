import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Observable, of} from "rxjs";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends GlobalHttpService{
  getPotentialPropertyListByOwner(owner: any, find: boolean): Observable<any> {

    return find ? this.http.post<any>(`${environment.baseApiUrl}/property/potential/list`, {
        owner: owner
      }
    ) : of(false);
  }


  getCantonList() {
    return this.http.get<any>(`${environment.baseApiUrl}/canton/list`);
  }
}
