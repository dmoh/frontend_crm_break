import { Injectable } from '@angular/core';
import {environment} from '../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Ad} from './models/ad';
import {Contact} from './models/contact';
import {GlobalHttpService} from "@app/_services/global-http.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends GlobalHttpService{

  urlBase: string = environment.baseApiUrl;



    getUsers(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/user/list`);
    }

    updateAd( fd: FormData): Observable<any> {
      const headersA = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      });
      return this.http
          .post(`${this.urlBase}/ad/update`,  fd, {headers: headersA, responseType: 'blob' as 'json' });

    }

    getAds(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/ad/list`);
    }


    getCategories(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/category/list`);
    }


    getContactList(): Observable<Contact[]> {
      return this.http
        .get<Contact[]>(`${this.urlBase}/contact/list`);
    }

    getAdsContacts() {
      return this.http
        .get<Contact[]>(`${this.urlBase}/ad/contact`);
    }







}
