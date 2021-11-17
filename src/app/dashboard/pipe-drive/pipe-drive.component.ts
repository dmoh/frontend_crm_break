import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offer } from '../models/offer';
import { OfferModalComponent } from './offer-modal/offer-modal.component';

@Component({
  selector: 'app-pipe-drive',
  templateUrl: './pipe-drive.component.html',
  styleUrls: ['./pipe-drive.component.scss'],
  providers: [MatSnackBar]
})
export class PipeDriveComponent implements OnInit {
  listLabel = "";
  itemContent: string;
  offers: Offer[] = [];


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(): void {
    //let tab;
    const dialogRef = this.dialog.open(OfferModalComponent, {
      width: '50%',
      data: new Offer,
    });
    dialogRef.afterClosed().subscribe(offers => {
      if (offers) {
        this.offers.push(offers)
        this.snackBar.open('Offre Ajoutée', 'Annulé', { duration: 2000 });
      }
      console.log('offers', this.offers)
    })
  }
  ngOnInit(): void {
  }

}
