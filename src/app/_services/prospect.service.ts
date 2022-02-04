import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProspectService extends GlobalHttpService {

  getProspectList(page: number): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/prospect/list/${page}`, {
        headers: this.headers
      }
    )
  }

  updateStatusProspect(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/prospect/update`, {
        comment: data.comment,
        status: data.status,
        property: data.property,
        reminders: data.reminders
      }, {
      headers: this.headers
      }
    )
  }


  findProspectByLocation(prospect: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/prospect/find/location`, {
        prospect: prospect
      }, {
        headers: this.headers
      }
    )
  }

}
