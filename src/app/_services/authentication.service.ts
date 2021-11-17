import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@app/environment/environment';
import { User } from '@app/_models/user';

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

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  /*this.user = [
    {id:1, username:'mohamed', email:'momo@gmail.com', roles:['admin']}
  ]*/

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //login(username: string, password: string) {
    login(user: User) {
    return this.http.post<any>(`${environment.baseApiUrl}/user/login`, { user })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // email, role ['ROLE_ADMIN','ROLE_SECRETAIREE'], id, firstname lastname
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        //return user;
        console.log('user', user)
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
