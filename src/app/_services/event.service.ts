import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {Event} from "@app/_models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService extends GlobalHttpService{

  updateEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/event/update`,
      {
        event: event
      },
      {
        headers: this.headers
      }
    )
  }

  removeEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/event/remove/${event.eventId}`,
      {
        event: event
      },
      {
        headers: this.headers
      }
    )
  }


  getEventList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/event/list`,
      {
        headers: this.headers
      }
    )
  }
}
