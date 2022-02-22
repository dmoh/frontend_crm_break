import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {Observable} from "rxjs";
import {environment} from "@environments/environment";
import {Reminder} from "@app/_models/reminder";

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends GlobalHttpService{
  getReminderList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/reminder/list`,
        {
        headers: this.headers
      }
    )
  }

  archivedReminderList(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/reminder/archive/list`,
      {
        headers: this.headers
      }
    )
  }

  archiveReminder(reminder: Reminder): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/reminder/archive/${reminder.id}`,
      {
        headers: this.headers
      }
    )
  }

}
