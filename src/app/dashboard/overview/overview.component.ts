import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ELEMENT_DATA, User} from '@app/_models/user';
import {DashboardService} from '@app/dashboard/dashboard.service';
import {Ad} from '@app/dashboard/models/ad';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  ads: Ad[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dashboardService.getAds().subscribe(
      (ads: Ad[]) => {
        this.ads = ads;
      }, (error) => {
        console.log(error);
      });
  }

}
