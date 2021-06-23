import { Component, OnInit } from '@angular/core';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Contact} from '@app/dashboard/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getContactList().subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
        this.dashboardService
        console.log(this.contacts);
      }, (error) => {
        console.log(error);
      }
    );

  }

}
