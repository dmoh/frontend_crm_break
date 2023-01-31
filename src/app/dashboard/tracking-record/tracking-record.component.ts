import { Component, OnInit } from '@angular/core';
import {OfferService} from "@app/_services/offer.service";
import { environment } from "@environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {timer} from "rxjs";

@Component({
  selector: 'app-tracking-record',
  templateUrl: './tracking-record.component.html',
  styleUrls: ['./tracking-record.component.scss']
})
export class TrackingRecordComponent implements OnInit {
  environment = environment;
  sales: any[] = []
  showSpinner = true;
  constructor(
    private snackBar: MatSnackBar,
    private offerService: OfferService) { }

  ngOnInit(): void {
    timer(1500).subscribe(_ => {
      this.offerService
        .getSaleList()
        .subscribe((res) => {
          if (res.sales) {
            this.sales = res.sales;
            this.showSpinner = false
          }
          this.showSpinner = false
        });
    })

  }

  onChangePhoto(event: any) {
    this.showSpinner = true;
    if (this.sales) {
      this.sales.forEach(sale => {
        if (sale.offer.property
          && +sale.offer.property.id === +event.id
        ) {
            sale.offer.property = event
            this.snackBar.open('Mise à jour avec succès ', 'ok', {
              duration: 4500
            });
            this.ngOnInit()
        }
      })
    }
  }

  onShowMedia(filename: string) {
    window.open(filename, '_blank')
  }
}
