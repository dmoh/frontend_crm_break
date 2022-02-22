import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ProspectService} from "@app/_services/prospect.service";
import {MatDialog} from "@angular/material/dialog";
import {ContainerModalComponent} from "@app/dashboard/container-modal/container-modal.component";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {BuyerGeoComponent} from "@app/buyer-geo/buyer-geo.component";
import {Subscription, timer} from "rxjs";
import {ViewportScroller} from "@angular/common";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {BuyerService} from "@app/_services/buyer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'Id',
    'buyer',
    'Commune',
    'Typologie',
    'Adresse',
    'Propriétaire',
    'Numéro',
    'Observations',
    'Status',
    'Géo',
    'Canton'];
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  prospects: any[] = [];
  prospectBuyers: any[] = [];
  nbResults = 0;
  showSpinner = false;
  crmConstants = crmConstants;
  firstTime = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {read: ElementRef}) table: ElementRef;

  prospectSub = new Subscription();
  pageLength = 0;
  pageSize = 0;
  pageIndex = 0;
  idCtrl = new FormControl();
  searchForm: FormGroup;
  isSearch = false;
  showCancelButton = false;
  constructor(
    private prospectService: ProspectService,
    private viewportScroller: ViewportScroller,
    private buyerService: BuyerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      id: [null],
      name: [null],
      city: [null],
      canton: [null],
      street: [null],
      typeProperty: [null]
    });
  }

  ngOnDestroy() {
    this.prospectSub.unsubscribe();
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.getProspectList(1, true);
  }

  private getProspectList(page: number, isFirstTime?: boolean) {
    let pageSelected = {page: page, isFirstTime: false, isForSearch: false};
    if (isFirstTime) {
      pageSelected.isFirstTime = true;
    }

    this.prospectSub = this.prospectService
      .getProspectList(pageSelected)
      .subscribe((response) => {
        this.showSpinner = false;
        if (response.prospects) {
          this.prospects = response.prospects;
          this.pageLength = response.pageLength;
          this.pageIndex = +(response.pageIndex - 1);
          this.nbResults = response.nbResults;
          this.reloadTable();
        }
      })
    ;
  }

  private reloadTable() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.dataSource = new MatTableDataSource(this.prospects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    if (this.prospectBuyers.length > 0) {
      // add this owners as buyers
      this.buyerService
        .getBuyerList()
    }
    this.dataSource = new MatTableDataSource();
    this.showSpinner = true;
    this.pageLength = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageIndex = 0 ? 1 : this.pageIndex;
    if (this.isSearch) {
      this.onSubmit();
    } else {
      this.getProspectList(this.pageIndex + 1, false);
    }
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

  onChangeBuyerState(event: MatCheckboxChange, prospect: any) {
    console.warn('changement etat', [event, prospect]);
    let message = '';
    if (event.checked) {
      message +=  `le propriétaire du bien ${prospect.id} est devenu acheteur`;
      if (this.prospectBuyers.length > 0) {
        const index = this.prospectBuyers.findIndex((elem) => +elem.id === +prospect.id);
        if (index === -1) {
          this.prospectBuyers = [...this.prospectBuyers, prospect.id];
        }
      } else {
        this.prospectBuyers = [prospect.id];
      }
    } else {
      message +=  `le propriétaire du bien ${prospect.id} n'est plus acheteur`;
      if (this.prospectBuyers.length > 0) {
        this.prospectBuyers = this.prospectBuyers.filter((elem) => +prospect.id !== +elem.id);
      }
    }

    this.buyerService
      .changeState({
        checked: event.checked,
        prospectId: prospect.id
      }).subscribe((res) => {
       if (res.ok) {
         this.snackBar.open(message, 'ok', {
           duration: 3000
         })
       }
    });

  }


  onSubmit() {
    this.showSpinner = true;

    const search = Object.assign({}, this.searchForm.value);
    if (
      !search.id
      && (!search.name   || search.name.trim().length < 3)
      && (!search.city   || search.city.trim().length < 3)
      && (!search.street || search.street.trim().length < 3)
      && (!search.canton || search.canton.trim().length < 3)
      && !search.typeProperty
    ) {
      this.snackBar.open(
        'Aucun filtre', 'ok',
        {
          duration: 3200
        }
      )
      this.showSpinner = false;
      return;
    }

    if (this.isSearch) {
      search.pageIndex = this.pageIndex;
      console.warn('pageIndex', this.pageIndex);
    }
    this.prospectSub = this.prospectService
      .searchProspect(search)
      .subscribe((res) => {
        if (res.properties) {
          this.isSearch = true;
          this.showCancelButton = true;
          this.prospects = res.properties;// TODO A ECLAIRCIR
          this.nbResults = res.nbResults;
          this.pageLength = res.pageLength;
          if (this.nbResults <= crmConstants.NB_PER_PAGE) {

          }
          this.reloadTable();
        }
        this.showSpinner = false;
      });
  }

  onCancelFilter() {
    this.isSearch = false;
    this.searchForm.reset();
    this.ngOnInit();
    setTimeout(() => {
      this.showCancelButton = false;
    }, 1200);
  }
}
