import { Injectable } from '@angular/core';
import { Members } from '@app/dashboard/models/members';
import { Project } from '@app/dashboard/models/project';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "@app/_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers: any;
  urlApi: string = environment.apiUrl;
  members: Members[];
  membersSub = new Subject<Members[]>();

  constructor(private http: HttpClient,  private authenticate: AuthenticationService) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    if (this.authenticate.tokenUserCurrent) {
      this.headers.append(`Authorization: Bearer ${this.authenticate.tokenUserCurrent}`) ;
    }
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/api/user/add`,{user: user}, this.headers);
  }


  /*constructor() {
    this.members = [
      {id: 1, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'edition', password: ''},
      {id: 2, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'manager', actions:'supression', password: ''},
      {id: 3, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'sécrétaire', actions:'supression', password: ''},
      {id: 4, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'modérateur', actions:'supression', password: ''},
    ]
  }*/
  emitMembers(): void{
    this.membersSub.next(this.members);
    console.log('memberss', this.members)
  }
  addMember(member: any): void {
    // this.members.push(member);
    this.registerUser(member);
    // this.emitMembers();

  }
  deleteMember(id) {
    this.members = this.members.filter(member=> member.id != id);
    this.emitMembers();
   }
}
