import { Injectable } from '@angular/core';
import {environment} from '../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs/index';
//import {Ad} from '@app/dashboard/models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  urlBase: string = environment.baseApiUrl;
  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: `Bearer ${token}`
      }
    )
  };


  constructor(private http: HttpClient) { }

  getAdById(idAd: number): Observable<any> {
    return this.http
      .get<any>(`${this.urlBase}/ad/${idAd}`, this.httpOptions);
  }
  opinionCustomerAboutAd(adId: number,data: string): Observable<any> {
    return this.http
      .post<any>(`${this.urlBase}/ad/${adId}/opinion/customer`, data,this.httpOptions);
  }



}
