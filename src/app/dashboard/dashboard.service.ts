import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Ad} from "./models/ad";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlBase: string = environment.baseApiUrl;
  httpOptions: {headers: HttpHeaders} = {
      headers: new HttpHeaders(
          {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // 'X-App-Instance': 'reseaudelta',
              //'Accept-Language': 'fr-FR',
              // 'X-App-Version': '2019.01.01',
              // X-AUTH-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNUFJfNTkiLCJhdWQiOiJST0xFX01FRElDQUxfVVNFUiIsImluc3RhbmNlIjoicmVzZWF1ZGVsdGEiLCJhdXRob3JpdHkiOiJST0xFX01FRElDQUxfVVNFUiIsImV4cCI6MTY3NjI5MDE4OCwiaWF0IjoxNTg5ODkwMTg4fQ.8mXSTGdtKJYaOsvIyuFPcCT1eCBOD-K1KSS76N2SIZM'
          }
      )
  };
  constructor(private http: HttpClient) {

  }


    getUsers(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/users`, this.httpOptions)
    }

    updateAd(ad: Ad): Observable<any> {
      return this.http
          .post(`${this.urlBase}/ad/update`, ad, this.httpOptions);
    }

    getAds(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.urlBase}/ads/list`, this.httpOptions)
    }
}
