import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ELEMENT_DATA, User} from '@app/_models/user';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Ad} from '@app/dashboard/models/ad';
import {ReminderService} from "@app/_services/reminder.service";
import {Reminder} from "@app/_models/reminder";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UsersService} from "@app/_services/users.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements  OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  ads: Ad[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  reminders: Reminder[] = [];
  showSpinnerReminder = true;
  showSpinnerStats = true;
  stats: any;
  statsChart: any;
  turnover: number;
  collaborators;
  showListCollaborator = false;
  collaboratorCtrl = new FormControl();

  constructor(
    private dashboardService: DashboardService,
    private reminderService: ReminderService,
    private snackBar: MatSnackBar,
    private userService: UsersService
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
      });
    this.reminderService
      .getAllStats()
      .subscribe((res) => {
        this.initStats(res);
      } );
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
  onGetStatsByCollaboratorId() {
    const collabs = this.collaboratorCtrl.value;
    if (collabs && +collabs > 0) {
      this.showSpinnerStats = true;
      this.reminderService
        .getAllStats(collabs)
        .subscribe((res) =>  {
          setTimeout(() => {
            this.initStats(res);
          }, 2500);
        })
      ;
    }
  }
  private initStats(res: any) {
    if (res.stats) {
      this.stats = res.stats;
    } else {
      this.stats = OverviewComponent.statsInit();
    }
    if (res.turnover) {
      this.userService
        .getMemberList()
        .subscribe((resp) => {
          this.collaborators = resp.users;
          this.showListCollaborator = true;
        });
      this.turnover = res.turnover;
    }
    if (res.statsChart) {
      this.statsChart = res.statsChart;
    }
    this.showSpinnerStats = false;
  }


  private static statsInit() {
    return {
      nbCall: 0,
      nbOfferMade: 0,
      nbVisit: 0,
      nbOfferClosing: 0
    };
  }
}




