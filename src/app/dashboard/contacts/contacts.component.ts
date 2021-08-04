import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Contact} from '@app/dashboard/models/contact';

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 2, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 3, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 4, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 5, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 6, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 7, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 8, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 9, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 10, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'adresse','email', 'phone'];
  dataSource = ELEMENT_DATA;
  //dataSource : MatTableDataSource<Contact> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    /*this.dashboardService.getContactList().subscribe(
      (contacts) => {
        this.dataSource.data = contacts;
        this.dataSource.paginator = this.paginator;
        //this.contacts = contactList;
        //this.dashboardService
        console.log(this.contacts);
      }, (error) => {
        console.log(error);
      }
    );*/

  }
  updateFilter(filter: any) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }

}
