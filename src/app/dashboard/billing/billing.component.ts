import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  description: string;
  user: string;
  date: string;
  amount: string;
  tva: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"approved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"appoved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"approved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"appoved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"approved"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},
  {description: "Lanch Snack", user: "Mohamed Litib", date: "16/03/2020", amount: "€35.19", tva:"€3.99", status:"pending"},

];

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})


export class BillingComponent implements OnInit {

  displayedColumns: string[] = ['description', 'user', 'date', 'amount', 'tva', 'status'];
  dataSource = ELEMENT_DATA;


  constructor() { }

  ngOnInit(): void {
  }
  updateFilter(filter: any) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }

}
