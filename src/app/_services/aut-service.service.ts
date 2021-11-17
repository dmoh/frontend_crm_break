import { Injectable } from '@angular/core';
import { User } from '@app/_models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutServiceService {

  //public user$: BehaviorSubject<User[] | null> = new BehaviorSubject([
  public users:User[] = [
    { id: 1, username: 'mohamed', email: 'mohamed@brec.com', role: 'admin', password:'123' },
    { id: 2, username: 'ali', email: 'ali@brec.com', role: 'manager', password:'123' },
    { id: 3, username: 'omar', email: 'omar@brec.com', role: 'moderateur', password:'123' },
    { id: 4, username:'mariam', email:'mariam@brec.com', role:'secretaire', password:'123'}
  ];
  loggedUserName: string;
  loggedUserRole: string;
  loggedUserMail: string;
  isLoggedIn: boolean;
  role: string;

  constructor() { }


  SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      //if(user.username=== curUser.username && user.password==curUser.password) {
        if(user.email === curUser.email) {
          validUser = true;
          this.loggedUserName = curUser.username;
          this.loggedUserRole = curUser.role;
          this.loggedUserMail = curUser.email;
          this.isLoggedIn = true;
          this.role = curUser.role;
          localStorage.setItem('loggedUser', this.loggedUserRole);
          localStorage.setItem('loggedUserName', this.loggedUserName);
          localStorage.setItem('loggedUserEmail',this.loggedUserMail);
          localStorage.setItem('isloggedIn',String(this.isLoggedIn));
      }
    });

    return validUser;
  }
}
