import { Injectable } from '@angular/core';
import {environment} from '../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Ad} from './models/ad';
import {Contact} from './models/contact';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlBase: string = environment.baseApiUrl;
  httpOptions: {headers: HttpHeaders} = {
      headers: new HttpHeaders(
          {
              'Content-Type': 'application/json',
              Accept: '*/*'
          }
      )
  };
  constructor(private http: HttpClient) {

  }


    getUsers(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/user/list`, this.httpOptions);
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
            .get<any[]>(`${this.urlBase}/ad/list`, this.httpOptions);
    }


    getCategories(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/category/list`, this.httpOptions);
    }


    getContactList(): Observable<Contact[]> {
      return this.http
        .get<Contact[]>(`${this.urlBase}/contact/list`, this.httpOptions);
    }

    getAdsContacts() {
      return this.http
        .get<Contact[]>(`${this.urlBase}/ad/contact`, this.httpOptions);
    }



}
