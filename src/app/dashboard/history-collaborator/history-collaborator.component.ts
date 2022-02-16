import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "@app/_services/users.service";
import {MatTableDataSource} from "@angular/material/table";
import {Buyer} from "@app/_models/buyer";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-history-collaborator',
  templateUrl: './history-collaborator.component.html',
  styleUrls: ['./history-collaborator.component.scss']
})
export class HistoryCollaboratorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'dateAction', 'action'];
  @ViewChild(MatSort) public sort: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService
      .getHistoryList()
      .subscribe((res) => {
        if (res.stories) {
          this.dataSource.data = res.stories;
          this.dataSource.sort = this.sort;
        }
      });

  }

}
