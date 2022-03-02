import { Component, OnInit } from '@angular/core';
import {OfferService} from "@app/_services/offer.service";
import { environment } from "@environments/environment";

@Component({
  selector: 'app-tracking-record',
  templateUrl: './tracking-record.component.html',
  styleUrls: ['./tracking-record.component.scss']
})
export class TrackingRecordComponent implements OnInit {
  environment = environment;
  sales: any[] = []
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService
      .getSaleList()
      .subscribe((res) => {
        if (res.sales) {
          this.sales = res.sales;

        }
      });
  }

}
