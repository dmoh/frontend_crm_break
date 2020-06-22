import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModalComponent} from "../../dialog-modal/dialog-modal.component";
import {Ad} from "../models/ad";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  animal: string;
  ads: any[] = [];
  constructor(
        private dashboardService: DashboardService,
        public dialog: MatDialog,

              ) { }

  ngOnInit(): void {

      this.dashboardService.getAds().subscribe((ads) => {
         this.ads = ads;
         console.warn(this.ads)
      });
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(DialogModalComponent, {
          width: '400px',
          data: new Ad()
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
      });
  }
}
