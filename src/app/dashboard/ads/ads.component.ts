import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModalComponent} from '../../dialog-modal/dialog-modal.component';
import {Ad} from '../models/ad';
import {DashboardService} from '../dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers: [MatSnackBar]
})
export class AdsComponent implements OnInit {
  animal: string;
  ads: any[] = [];
  constructor(
        private dashboardService: DashboardService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
      this.dashboardService.getAds().subscribe((ads) => {
         this.ads = ads;
         console.warn(this.ads);
      });
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(DialogModalComponent, { // todo globaliser modal
          width: '80%',
          data: new Ad()
      });

      dialogRef.afterClosed().subscribe(result => {
        console.warn(result);
        if (result.success) {
            this.snackBar.open(result.success, 'dfdff', {duration: 3000});
        }
      });
  }

  onUpdateAd(ad: Ad): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '80%',
      data: ad
    });
  }
}
