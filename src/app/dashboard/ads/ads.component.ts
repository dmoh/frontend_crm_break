import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModalComponent} from '../../dialog-modal/dialog-modal.component';
import {DashboardService} from '../dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
//import { Ad } from '../models/ad';
import { Ad } from '../models/ad';
import { BehaviorSubject, Observable, Observer, Subject, Subscription } from 'rxjs';

const ELEMENT_DATA: Ad[] = [
  {id: 1, title: "Appartement locatif", sellingPrice: 150000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', image: ''},
  {id: 2, title: "Immeuble de bureaux", sellingPrice: 200000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', image: ''},
  {id: 3, title: "Maison", sellingPrice: 400000, description: "35 avenue charle de gaules Paris", published: false, assets: '', comment: '', image: ''},

];

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers: [MatSnackBar]
})
export class AdsComponent implements OnInit{
  animal: string;
  ads: Ad[] = [];
  date = new Date().toISOString().split('T')[0];
  //public dateEvent: BehaviorSubject<any> = new BehaviorSubject(null);
  displayedColumns: string[] = ['id', 'title', 'price', 'image'];
  dataSource = ELEMENT_DATA;
  dateEvent = new Subject<any>();
  dateEventSub: Subscription;
  event: any;
  evenement = false;


  //dialogRef;
  //dataSource : MatTableDataSource<Ad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private dashboardService: DashboardService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
      /*this.dashboardService.getAds().subscribe((ads) => {
      this.dataSource.data = ads;
      this.dataSource.paginator = this.paginator;
      console.warn('ads', this.ads);
      });*/
      //this.date = new Date().toISOString().split('T')[0];


    //console.log('DATEEVENT', this.event.getDate())
    //let eventt;
   /* let eventt;
    console.log(eventt);

    this.dateEventSub = this.dateEvent.subscribe((date) => {

     // console.log('DATE', this.date.getDate())
      //this.event = date;
      eventt = date;


      return this.event;

        //console.log("eventOnit", this.event.getDate())

        /*if (this.event) {
          if (this.event.getDate() === this.date.getDate()) {
            this.evenement = true;
            this.snackBar.open('évènement', 'Annulé');

            console.log('getdate', this.event.getDate());

          //}
        }
        //console.log('2', this.event);

    })*/


    //this.event === this.date ? this.snackBar.open('évènement', 'Annulé', {verticalPosition:'top'}) : null;

}
  /*ngOnDestroy() {
    this.dateEventSub.unsubscribe();
  }*/
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModalComponent, { // todo globaliser modal
          width: '100%',
          data: new Ad,
      });

    dialogRef.afterClosed().subscribe(result => {



        //console.warn(result, 'result');
        //const data = result.contacts.dateEvent.toISOString().split('T')[0];
        //this.dateEvent.next(data);

        //console.log(data, "event");
        if (result) {
          //console.log(result.contacts.dateEvent, 'result');
          this.snackBar.open('Annonce ajoutée', 'Annulé', { duration: 1000 });
        }
        /*if (this.dateEvent.getDay() === this.date.getDay())  {
          this.snackBar.open('évènement','Annulé', {duration: 3000});
        }*/

      });
  }

  /*onUpdateAd(ad: Ad): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '80%',
      data: ad
    });
  }*/

  updateFilter(filter: any) {
    const finalFilter = filter.trim().toLowerCase();
    this.dataSource.filter = finalFilter;
  }
}
