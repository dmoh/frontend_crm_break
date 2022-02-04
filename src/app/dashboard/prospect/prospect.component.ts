import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ProspectService} from "@app/_services/prospect.service";
import {Property} from "@app/_models/property";
import {MatDialog} from "@angular/material/dialog";
import {ContainerModalComponent} from "@app/dashboard/container-modal/container-modal.component";
import {stat} from "fs";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {BuyerGeoComponent} from "@app/buyer-geo/buyer-geo.component";
import {timer} from "rxjs";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {
  displayedColumns: string[] = ['Commune', 'Typologie', 'Adresse', 'Propriétaire', 'Numéro', 'Observations', 'Statut', 'Géo', 'Canton'];
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  propects: any[] = [];
  nbResults = 0;
  showSpinner = false;
  crmConstants = crmConstants;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  pageLength = 0;
  pageSize = 0;
  pageIndex = 0;
  constructor(
    private prospectService: ProspectService,
    private viewportScroller: ViewportScroller,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.getProspectList(1);
  }

  private getProspectList(page: number) {
    this.prospectService
      .getProspectList(page)
      .subscribe((response) => {
        this.showSpinner = false
        if (response.prospects) {
          this.propects = response.prospects;
          this.pageLength = response.pageLength;
          this.nbResults = response.nbResults;
          this.dataSource = new MatTableDataSource(this.propects);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }
        console.warn('ress', response);
      })
    ;
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

  handlePageEvent(event: PageEvent) {
    console.warn('handle', event);
    this.dataSource = new MatTableDataSource();
    this.showSpinner = true;
    this.pageLength = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.warn(this.pageIndex);
    this.pageIndex = 0 ? 1 : this.pageIndex;
    this.getProspectList(this.pageIndex + 1);
  }

  onOpenGeo(data) {
    this.dialog.open(BuyerGeoComponent, {
      data: {
        address: `${data.street}, ${data.city}`,
        info: data
      }
    });
  }

  scrollTop() {
    this.table.nativeElement.scrollIntoView();
  }
}
