import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';
import {crmConstants} from "@app/_helpers/crm-constants";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  /*users: User[] = [
    { id: 1, username: 'mohamed', email: 'momo@gmail.com', roles: ['admin'] },
    { id: 2, username: 'ali', email: 'ali@gmail.com', roles: ['manager'] },
    { id: 3, username: 'omar', email: 'omar@gmail.com', roles: ['moderateur'] },
    { id: 4, username:'mariam', email:'mariam@gmail.com', roles:['secretaire']}
  ];*/

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(crmConstants.nameCurrentUser)));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  /*this.user = [
    {id:1, username:'mohamed', email:'momo@gmail.com', roles:['admin']}
  ]*/

  public get tokenUserCurrent(): string | boolean {
    return <string>localStorage.getItem(crmConstants.nameCurrentUser) ? JSON.parse(<string>localStorage.getItem(crmConstants.nameCurrentUser)).token : false; // this.currentUserSubject.value.token;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //login(username: string, password: string) {
    login(userData: any) {
    return from(this.http.post<any>(`${environment.apiUrl}/api/login_check`, userData)
      .pipe(map(user => {
        console.warn('dec', jwt_decode(user.token));
        localStorage.setItem(
          crmConstants.nameCurrentUser,
          JSON.stringify(user)
          );
        this.currentUserSubject.next(user);
        return user;
      })));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(crmConstants.nameCurrentUser);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }
}
