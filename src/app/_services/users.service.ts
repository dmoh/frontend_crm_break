import { Injectable } from '@angular/core';
import { Members } from '@app/dashboard/models/members';
import { Project } from '@app/dashboard/models/project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  members: Members[];
  membersSub = new Subject<Members[]>();

  constructor() {
    this.members = [
      {id: 1, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'admin', actions:'edition', password: ''},
      {id: 2, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'manager', actions:'supression', password: ''},
      {id: 3, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'sécrétaire', actions:'supression', password: ''},
      {id: 4, name: "Mohamed", lastName: "Litib", email:"m.litib@gmail.com", rules:'modérateur', actions:'supression', password: ''},
    ]
  }
  emitMembers(): void{
    this.membersSub.next(this.members);
    console.log('memberss', this.members)
  }
  addMember(member: any): void {
    this.members.push(member);
    this.emitMembers()
  }
  deleteMember(id) {
    this.members = this.members.filter(member=> member.id != id);
    this.emitMembers();
   }
}
