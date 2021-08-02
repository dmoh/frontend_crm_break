import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Contact} from '@app/dashboard/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'adresse','email', 'phone'];
  dataSource : MatTableDataSource<Contact> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getContactList().subscribe(
      (contacts) => {
        this.dataSource.data = contacts;
        this.dataSource.paginator = this.paginator;
        //this.contacts = contactList;
        //this.dashboardService
        console.log(this.contacts);
      }, (error) => {
        console.log(error);
      }
    );

  }
  updateFilter(filter: string) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }

}
