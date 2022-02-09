import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ELEMENT_DATA, User} from '@app/_models/user';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Ad} from '@app/dashboard/models/ad';
import {ReminderService} from "@app/_services/reminder.service";
import {Reminder} from "@app/_models/reminder";
import {MatSnackBar} from "@angular/material/snack-bar";
//import { Chart } from 'chart.js';
//import * as Chart from 'chart.js';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent implements  OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  ads: Ad[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  reminders: Reminder[] = [];
  showSpinnerReminder = true;

  constructor(
    private dashboardService: DashboardService,
    private reminderService: ReminderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    this.reminderService
      .getReminderList()
      .subscribe((response) => {
        this.showSpinnerReminder = false;
        if (response.reminders) {
          this.reminders = response.reminders;
          if (this.reminders.length > 0) {
            this.reminders.forEach((reminder) => {
              const today = new Date(reminder.remindAt.date).getTime();
              reminder.remindAt = today;
            });
          }
        }
        console.warn(response);

      })
    /*this.dataSource.paginator = this.paginator;
    this.dashboardService.getAds().subscribe(
      (ads: Ad[]) => {
        this.ads = ads;
        ads.splice(3, 28)
        console.log(ads)
      }, (error) => {
        console.log(error);
      });*/


    }

  onArchiveReminder(reminder: Reminder) {
    this.reminderService
      .archiveReminder(reminder)
      .subscribe((response) => {
        let msg = 'Un probléme est survenu pour archiver ce rappel';
        if (response.ok) {
          msg = 'Ce rappel a été archivé avec succés';
          this.reminders = this.reminders.filter((r) => r.id !== reminder.id);
        }
        this.snackBar.open(msg, 'ok', {
          duration: 4500
        })
      });
  }
}


