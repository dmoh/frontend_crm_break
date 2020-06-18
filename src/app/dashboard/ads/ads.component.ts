import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModalComponent} from "../../dialog-modal/dialog-modal.component";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  animal: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(DialogModalComponent, {
          width: '400px',
          data: {name: 'lekrel', animal: 'DFSDFSDFS'}
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
      });
  }
}
