import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../models/list';
import { Offer } from '@app/_models/offer';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DialogModalComponent } from '@app/dialog-modal/dialog-modal.component';
import { Ad } from '../models/ad';
import {OfferService} from "@app/_services/offer.service";
import {crmConstants} from "@app/_helpers/crm-constants";
import {FormControl} from "@angular/forms";
import {UsersService} from "@app/_services/users.service";
import {map} from "rxjs/operators";
import {ClosingOfferComponent} from "@app/_modals/closing-offer/closing-offer.component";
import {PropertyService} from "@app/_services/property.service";

@Component({
  selector: 'app-pipe-drive',
  templateUrl: './pipe-drive.component.html',
  styleUrls: ['./pipe-drive.component.scss'],
  providers: [MatSnackBar]
})
export class PipeDriveComponent implements OnInit {
  offers: Offer[] = [];
  offersOnWaiting: Offer[] = [];
  green = false;
  offerDropped = new Offer();
  listLabel = "";
  itemContent: string;
  over = false;
  collaborators = [];
  collaboratorCtrl = new FormControl();
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  basket: any[];
  showListCollaborator = false;
  offreAttente: any[] = [];
  archivedOffers: Offer[] = [];
  crmConstants = crmConstants;
  columns: any[] = [
    {
      id: crmConstants.CODE_OFFER_STATUS_INIT.value,
      titre: 'Teaser',
      colorBox: 'redBox',
      color: 'red',
      offre:
        [],
    },
    {
      id:crmConstants.CODE_OFFER_STATUS_MEMORANDUM.value,
      titre: 'Mémorandum / Dossier complet',
      colorBox: 'blueBox',
      color: 'blue',
      offre:
        [
        ],
    },
    {
      id: crmConstants.CODE_OFFER_STATUS_INDICATIVE.value,
      titre: 'Offre Indicative',
      colorBox: 'orangeBox',
      color: 'orange',
      offre: [
      ],
    },
    {
      id: crmConstants.CODE_OFFER_STATUS_VISIT_PROPERTY.value,
      titre: 'Due Diligence / Visites',
      colorBox: 'greenBox',
      color: 'green',
      offre: [
      ],
    },
    {
      id: crmConstants.CODE_OFFER_STATUS_LAST.value,
      titre: 'Offre Ferme',
      colorBox: 'tealBox',
      color: 'teal',
      offre: [
      ],
    },
    {
      id: crmConstants.CODE_OFFER_STATUS_CLOSING.value,
      titre: 'Closing / Signature',
      colorBox: 'purpleBox',
      color: 'purple',
      offre: [
      ],
    },
]
  drag = false;
  offersSaved = [];
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UsersService,
              private offerService: OfferService,
              private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.getOfferList();
  }


  private getOfferList() {
    this.offerService
      .getOfferList()
      .subscribe((res) => {
        if (res.showListCollaborator) {
          this.userService
            .getMemberList()
            .subscribe((resp) => {
              this.collaborators = resp.users;
            });
          this.showListCollaborator = true;
        }
        if(res.offers) {
          this.offersSaved = res.offers;
          this.sortOffer();
        }
      })
  }

  private sortOffer() {
    this.columns.forEach((elem) => {
      elem.offre = this.offersSaved.filter((offer) => +offer.status === +elem.id);
    });
    this.offersOnWaiting = this.offersSaved.filter((offer) => +crmConstants.CODE_OFFER_STATUS_ON_WAITING.value === +offer.status);
    this.archivedOffers = this.offersSaved.filter((offer) => +crmConstants.CODE_OFFER_STATUS_ARCHIVED.value === +offer.status);
  }

  drop(event: CdkDragDrop<string[]>, columnId?: number) {
    if (columnId === crmConstants.CODE_OFFER_STATUS_CLOSING.value) {
        setTimeout(() => {
          this.openDialogClosing(this.offerDropped, columnId);
        }, 500);
    } else {
      setTimeout(() => {
        this.updateAll(columnId);
      }, 500);

    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }

  }

  private updateAll(columnId) {
    this.handleOfferOnWaiting(columnId);
    // mettra à jour le status offre et property si property il y a
    this.offerService
      .updateStatusOffer(this.offerDropped.id, columnId)
      .subscribe((res) => {
        if (res && res.ok) {
          this.offerDropped.status = columnId;
          this.snackBar.open('Status de l\'offre mis à jour', 'ok', {
            duration: 3000
          });
          this.handleOfferOnWaiting(columnId);
          this.sortOffer();
        }
      });
  }
  handleOfferOnWaiting(columnId: number) {
    if (columnId === crmConstants.CODE_OFFER_STATUS_ON_WAITING.value) {
      if (this.offersOnWaiting && this.offersOnWaiting.length > 0) {
        const index = this.offersOnWaiting.findIndex((elem) => +elem.id && +this.offerDropped.id);
        if (index === -1) {
          this.offersOnWaiting = [...this.offersOnWaiting,  this.offerDropped];
        }
      } else {
        this.offersOnWaiting = [this.offerDropped];
      }
    }
    if (columnId === crmConstants.CODE_OFFER_STATUS_ARCHIVED.value) {
      if (this.archivedOffers.length > 0) {
        const index = this.archivedOffers.findIndex((elem) => +elem.id && +this.offerDropped.id);
        if (index === -1) {
          this.archivedOffers = [...this.archivedOffers,  this.offerDropped];
        }
      } else {
        this.archivedOffers = [this.offerDropped];
      }
    }
  }
  openDialog(offer?: any): void {
    this.offerDropped = new Offer();
    if (offer) {
      this.offerDropped = this.offersSaved.filter((elem) => +elem.id === +offer.id)[0];
      this.propertyService
        .setPropertyCurrent(this.offerDropped.property);
    }
    const dialogRef = this.dialog.open(OfferModalComponent, {
      width: '90%',
      data: {
        offer: this.offerDropped
      },
    });
    dialogRef.afterClosed().subscribe(offer => {
      if (offer) {
        this.getOfferList();
      }
    })
  }





  dropOffer(item: any) {
    this.offerDropped = item
  }

  onGetOfferByCollaboratorId() {
    const collabs = this.collaboratorCtrl.value;
    if (collabs) {
        this.columns.forEach((elem) => {
          elem.offre = this.offersSaved.filter(
            (offer) =>
              +offer.status === +elem.id
              && +collabs === +offer.collaboratorId
          );
      });
    } else {
      this.columns.forEach((elem) => {
        elem.offre = this.offersSaved.filter(
          (offer) =>
            +offer.status === +elem.id);
      });
    }
  }

  private openDialogClosing(offerDropped: Offer, columnId: number) {
    const dialogRef = this.dialog.open(ClosingOfferComponent, {
      data: {
        offer: offerDropped
      }
    });
    dialogRef.afterClosed()
      .subscribe((res) => {
        if (res && res.id) {
          this.offerService
            .updateOffer(res)
            .subscribe((response) => {
              if (response.ok) {
                this.updateAll(columnId);
              }
            })
        } else {
          this.sortOffer();
        }
      })
    ;
  }

  dropArchivedOffer(event: any) {
   this.updateAll(crmConstants.CODE_OFFER_STATUS_ARCHIVED.value);
  }
}
