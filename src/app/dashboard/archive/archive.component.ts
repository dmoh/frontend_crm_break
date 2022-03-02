import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ReminderService} from "@app/_services/reminder.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {OfferService} from "@app/_services/offer.service";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  @ViewChild(MatSort) public sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'date', 'remindDate', 'subject', 'message'];
  displayedColumnsOffers: string[] = ['id', 'date', 'collaborator','title', 'sellingPrice', 'property'];
  reminders = [];
  showSpinnerOffer = true;
  showSpinnerReminder = true;
  showSpinnerProperty = true;
  constructor(
    private reminderService: ReminderService,
    private offerService: OfferService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reminderService.archivedReminderList()
      .subscribe((res) => {
        if (res.reminders) {
          this.dataSource = new MatTableDataSource<any>();
          this.dataSource.data = res.reminders;
          this.dataSource.sort = this.sort;
        } else {
          if (res.ok) {
            this.snackBar.open('Aucun rappel', 'ok',{
              duration: 2500
            });
          }
        }
      });
  }

  onChangeTab(event: MatTabChangeEvent) {
    console.warn(event);
    if (event.index === 1) {
      // reload offers
      this.loadOffers();
    }
    if (event.index === 0) {
      // reload reminders
    }
    if (event.index === 2) {
      // reload prospects
    }
  }



  private loadOffers() {
    this.offerService
      .getOfferArchiveList()
      .subscribe((res) => {
        if (res.offers) {
          this.dataSource = new MatTableDataSource<any>();
          this.dataSource.data = res.offers;
          this.dataSource.sort = this.sort;
        } else {
          this.snackBar.open('Aucune offre archivé', 'ok', {
            duration: 2500
          });
        }
        this.showSpinnerOffer = false;

      });
  }
}
