import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "@app/_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpService {
  headers: HttpHeaders;

  constructor(protected http: HttpClient,  private authenticate: AuthenticationService) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    if (this.authenticate.tokenUserCurrent) {
      console.warn('je passe bien là');
      this.headers.append(`Authorization`,  `
      Bearer ${this.authenticate.tokenUserCurrent}`) ;
    }
  }


}
