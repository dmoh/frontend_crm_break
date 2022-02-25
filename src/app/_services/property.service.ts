import { Injectable } from '@angular/core';
import {GlobalHttpService} from "@app/_services/global-http.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "@environments/environment";
import {Property} from "@app/_models/property";

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends GlobalHttpService{
  private propertySubject = new BehaviorSubject(new Property());
  propertyCurrent = this.propertySubject.asObservable();


  getPotentialPropertyListByOwner(owner: any, find: boolean): Observable<any> {
    return find ? this.http.post<any>(`${environment.baseApiUrl}/property/potential/list`, {
        owner: owner
      }
    ) : of(false);
  }


  setPropertyCurrent(property: Property) {
    this.propertySubject.next(property);
  }

  getCantonList() {
    return this.http.get<any>(`${environment.baseApiUrl}/canton/list`);
  }


  getMediasProperty(propertyId: number) {
    return this.http.get<any>(`${environment.baseApiUrl}/property/${propertyId}/media`);
  }


  updateToProperty(fd: FormData): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/property/update`, fd
    )
  }


  deleteMediaToProperty(mediaId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/property/media/${mediaId}/remove`
    )
  }
}
