import { Component, OnInit } from '@angular/core';
import { Members } from '../models/members';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  /*members: Members[];
  displayedColumns: string[] = ['taches', 'admin', 'manager', 'moderateur', 'secretaire'];*/

  constructor() { }

  ngOnInit(): void {
  }

}
