import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Buyer} from "@app/_models/buyer";
import {ReminderService} from "@app/_services/reminder.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  @ViewChild(MatSort) public sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'date', 'remindDate', 'subject', 'message'];
  reminders = [];
  constructor(
    private reminderService: ReminderService,
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

}
