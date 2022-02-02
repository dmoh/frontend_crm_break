import {Component, OnInit, ViewChild} from '@angular/core';
import {ProspectService} from "@app/_services/prospect.service";
import {Property} from "@app/_models/property";
import {MatDialog} from "@angular/material/dialog";
import {ContainerModalComponent} from "@app/dashboard/container-modal/container-modal.component";
import {stat} from "fs";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {BuyerGeoComponent} from "@app/buyer-geo/buyer-geo.component";

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {
  displayedColumns: string[] = ['Commune', 'Typologie', 'Adresse', 'Propriétaire', 'Numéro', 'Observations', 'Statut', 'Géo'];
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  propects: any[] = [];
  crmConstants = crmConstants;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private prospectService: ProspectService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.prospectService
      .getProspectList()
      .subscribe((response) => {
        if (response.prospects) {
          this.propects = response.prospects;
          this.dataSource = new MatTableDataSource(this.propects);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        console.warn('ress', response);
      })
  }

  onChangeStatus($event: any, data: any) {
    const statusSelected = $event.value;
    let dialogRef = null;
    if (statusSelected !== data.status) {
      data.status = $event.value;
      dialogRef = this.dialog.open(ContainerModalComponent, {
        data: {
          property: data,
          statusSelected: statusSelected
        },
        disableClose: true,
        minWidth: '80%',
        autoFocus: false
      });
    }
    if (dialogRef) {
      dialogRef.afterClosed()
        .subscribe((response) => {
          if (response &&  response.comment) {
            data = response;
          }
        })
      ;
    }
  }

  onOpenGeo(data) {
    this.dialog.open(BuyerGeoComponent, {
    });
  }
}
