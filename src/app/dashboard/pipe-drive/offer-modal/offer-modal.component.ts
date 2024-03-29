import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Offer} from '@app/_models/offer';
import {OfferService} from "@app/_services/offer.service";
import {Buyer} from "@app/_models/buyer";
import {Helper} from "@app/_helpers/helper";
import {BuyerService} from "@app/_services/buyer.service";
import {Property} from "@app/_models/property";
import {ENTER, COMMA} from "@angular/cdk/keycodes";
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from "rxjs/operators";
import {PropertyService} from "@app/_services/property.service";
import {TemplateMailComponent} from "@app/template-mail/template-mail.component";
import {MatTable} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {crmConstants} from "@app/_helpers/crm-constants";
import {Owner} from "@app/_models/owner";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  offers: Offer[];
  offer: Offer = new Offer();
  buyers: Buyer[] = [];
  offerForm: FormGroup;
  propertyAddressForm: FormGroup;
  propertyForm: FormGroup;
  ownerForm: FormGroup;
  isLoading = false;
  isLoadingB = false;

  crmConstants = crmConstants;
  filteredOptions: any[];
  filteredOptionsB: any[];
  private findBuyer: boolean = true;

  buyersForm = new FormArray([]);
  yield = null;


  properties: Property[] = [];
  property: Property = new Property();
  propertyCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];


  buyerToRemove = []
  dataSource = [];
  displayedColumns: string[] = ['selectForAction','removeBuyer', 'fullname', 'amountOfferProposed','email', 'actions'];
  displayedColumnsBuyers: string[] = ['selectForAction','removeBuyer', 'fullname', 'amountOfferProposed','email', 'actions'];

  @ViewChild('propertyInput') propertyInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Buyer>;
  sendMailBuyersCtrl: FormControl = new FormControl();
  ownerNameCtrl: FormControl = new FormControl();
  enableNextButton = false;
  private findOwners: boolean = true;
  buyerNameCtrl = new FormControl();
  removeAllBuyers = false;
  // Fonction de comparaison personnalisée
  comparer = (a, b) => {
    // Tri par ordre décroissant des valeurs définies
    if (a.amountOffer !== null && a.amountOffer !== undefined && b.amountOffer !== null && b.amountOffer !== undefined) {
      return b.amountOffer - a.amountOffer;
    }
    if (a.amountOffer === null || a.amountOffer === undefined) {
      return 1;
    }
    return -1
  }
  constructor(
    private offerService: OfferService,
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { offer: Offer },
    public dialogRef: MatDialogRef<OfferModalComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.offer) {
      this.offer = this.data.offer;
    }
    this.initForm();
    this.calculateYield();
    this.findProperty();
    this.findBuyerByName();
    this.propertyService
      .propertyCurrent
      .subscribe((prop: Property) => {
        this.offer.property = prop;
        this.calculateYield();
        this.findProperty();
      });
  }


  addBuyer() {
    const group = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(''),
      comment: new FormControl(''),
      customerType: new FormControl(''), // todo type society/particular
      amountOffer: new FormControl(0), // todo type society/particular
      /*budgetMin: new FormControl(''), // todo type society/particular
      budgetMax: new FormControl('') */// todo type society/particular
    });
    this.buyersForm.push(group);
  }

  removeBuyer(index: number) {
    this.buyersForm.removeAt(index);
  }

  initForm() {
    this.offerForm = this.formBuilder.group({
      title: [this.offer.title, [Validators.required]],
      status: [this.offer.status],
      sellingPropositionPrice: [this.offer.sellingPropositionPrice, [Validators.required]],
      commission: [this.offer.commission],
    });

    this.sendMailBuyersCtrl.patchValue(this.offer.sendMailBuyers);

    this.initOwnerForm();

  }

  onSubmit(): void {
    // this.assignOffer();
    this.offer = Object.assign(this.offer, this.offerForm.value);
    this.offer.property.sellingPrice = this.offer.sellingPropositionPrice;
    const newBuyers = this.buyersForm.value;
    if (newBuyers.length > 0) {
      newBuyers.forEach((b) => {
        const newBuyer = Object.assign(new Buyer(), b);
        this.buyers = [...this.buyers, newBuyer]; // todo check if not exists
      })
    }
    this.offer.potentialBuyers = this.buyers;
    this.offerService
      .updateOffer(this.offer)
      .subscribe((response: any) => {
        if (response.ok) {
          this.dialogRef.close(true);
        }
      });

  }


  getPotentialBuyers() {
    this.property = this.offer.property;
    if (
      this.offer.property.id === 0
      || !this.property.address.canton
    ) {
      return;
    }
    this.assignOffer();
    this.buyerService
      .getPotentialBuyerList(this.offer)
      .subscribe((response: any) => {
        if (response.ok) {
          if (response.buyers) {
            this.buyers = response.buyers;
          }
          if (this.buyers
            && this.buyers.length > 0
            && this.offer.potentialBuyers
            && this.offer.potentialBuyers.length > 0
          ) {
            const buyersOffer = this.offer.potentialBuyers;
            for (const buyer of buyersOffer) {
              const buyerIndex = this.buyers.findIndex((buyerMatch) => +buyerMatch.id === +buyer.id);
              if (buyerIndex === -1) {
                this.buyers = [buyer, ...this.buyers];
              } else {
                this.buyers[buyerIndex] = buyer

              }
            }
            this.buyers.sort(this.comparer);
          }

          this.dataSource = [...this.buyers];
          if (response.buyers && response.buyers.length === 0) {
            this.snackBar
              .open('Aucun acheteur potentiel trouvé', 'ok', {
                duration: 3500
              })
          }
        }
      });
  }

  remove(propertyId): void {
    const index = this.properties.findIndex((property) => +property.id === +propertyId);
    if (index >= 0) {
      this.properties.splice(index, 1);
    }
  }

  displayFn(option: any) {
    if (option) {
      return option.owners;
    }
  }

  setValuesForm(form: string, field: string, value: any) {
    switch (form) {
      case 'property':
        this.propertyForm.get(field)
          .patchValue(value);
        break;
      case 'address':
        this.propertyAddressForm.get(field)
          .patchValue(value);
        break;
      case 'offer':
        this.offerForm.get(field)
          .patchValue(value);
        break;
      case 'owner':
        this.ownerForm.get(field)
          .patchValue(value);
        break;
    }
  }

  findProperty() {
    this.ownerNameCtrl
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => this.isLoading = true),
        filter((value) => {
          if (value && value.length > 0 && value.trim().length > 3) {
            return true;
          } else {
            this.isLoading = false;
            this.filteredOptions = [];
            return false;
          }
        }),
        switchMap(value =>
          this.propertyService.getPotentialPropertyListByOwner(value, this.findOwners)
            .pipe(
              finalize(() => this.isLoading = false),
            )
        )
      )
      .subscribe(res => {
        if (res.properties) {
          this.filteredOptions = res.properties;
        }
      });
  }

  onChange(option) {
    this.findOwners = false;
    this.mergeProperty(option);
    setTimeout(_ => this.findOwners = true, 2500);
  }

  openEmail(buyer: Buyer): void {
    const dialogRef = this.dialog.open(TemplateMailComponent, { // todo globaliser modal
      width: '100%',
      data: {
        buyer: buyer
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.message) {
        buyer.messageMail = result.message;
        this.snackBar.open('Template du mail pour ' +
          buyer.name + ' a été modifié'
          , 'ok', {duration: 5000});
      }
    });
  }
  onSendMail() {
    this.offer.sendMailBuyers = !this.offer.sendMailBuyers;
  }

  onChangeStateButtonNext(event: boolean) {
    this.enableNextButton = event;
  }

  onRemoveOffer(id: number) {
    this.offerService
      .removeOffer(id)
      .subscribe((res) => {
        if (res.ok) {
          this.snackBar.open('Offre supprimée avec succès', 'ok', {
            duration: 2500
          });
          this.dialogRef.close({offerId: id});
        }
      })
  }

  private assignOffer(): void {
    this.offer = Object.assign(this.offer, this.offerForm.value);

    this.offer.property.sellingPrice = this.offer.sellingPropositionPrice;
  }

  private calculateYield() {
  }

  private mergeProperty(property: any) {
    this.property = new Property();

    this.property.id = property.id;
    this.property.propertyUnsortedId = property.id;
    this.property.typeProperty = property.propertyType;
    this.property.ownerName = property.owners;
    this.property.address.street = property.street;
    this.property.address.city = property.city;
    this.property.labelTypeProperty = !property.propertyType &&
    +property.propertyType > 0 ? Helper.getLabelTypePropertyByValue(+property.propertyType) :
      null
    ;
    this.property.comment = property.comment;
    this.property.owner.name = property.owners;
    this.property.owner.phoneNumber = property.phoneNumber;
    this.offer.property.address = Object.assign(
      this.offer.property.address,
      this.property.address
    );


    this.offer.property = Object.assign(this.offer.property, this.property);
    //setter les éléments
    this.offer.property.ownerName = property.owners;
    this.offer.property.yield = this.property.yield;
    this.offer.property = property;
    this.property = property;
    this.propertyService
      .setPropertyCurrent(this.offer.property);
  }

  private initOwnerForm() {
    if (!this.offer.property.owner) {
      let initOwner = new Owner();
      initOwner.name = this.offer.property.owners;
      initOwner.phoneNumber = this.offer.property.phoneNumber;
      initOwner.email = this.offer.property.email;
      this.offer.property.owner = Object.assign(new Owner(), initOwner);
    }
  }

  onCloseModal() {
    this.dialogRef.close(false);
  }
  displayFnB(option: any) {
    if (option) {
      return option.name;
    }
  }

  findBuyerByName() {
    this.buyerNameCtrl
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => this.isLoadingB = true),
        filter((value) => {
          if (value && value.length > 0 && value.trim().length > 1) {
            return true;
          } else {
            this.isLoadingB = false;
            this.filteredOptionsB = [];
            return false;
          }
        }),
        switchMap(value =>
          this.propertyService.getPotentialBuyerByName(value, this.findBuyer)
            .pipe(
              finalize(() => this.isLoadingB = false),
            )
        )
      )
      .subscribe(res => {
        // @ts-ignore
        if (res.buyers) {
          // @ts-ignore
          this.filteredOptionsB = res.buyers;
        }
      });
  }
  onChangeB(option) {
    this.buyers = [option, ...this.buyers];
    this.dataSource.push(option);
    this.table.renderRows();
    this.findBuyer = false;
    setTimeout(_ => this.findBuyer = true, 2500);
  }

  onRemoveBuyer(id?: number, removeSelected = false) {
    if (removeSelected) {
      for (const id of this.buyerToRemove) {
        this.dataSource = this.dataSource.filter(buyer => +buyer.id !== +id);
        this.buyers = this.buyers.filter(buyer => +buyer.id !== +id);
      }
    } else {
      this.dataSource = this.dataSource.filter(buyer => +buyer.id !== +id);
      this.buyers = this.buyers.filter(buyer => +buyer.id !== +id);
    }
    this.table.renderRows();
  }

  onChangeStateBuyer(event: MatCheckboxChange, buyer: Buyer, selectAll = false) {
    if (event.checked) {
      if (buyer && buyer.id > 0 && !this.buyerToRemove.includes(buyer.id)) {
        this.buyerToRemove = [...this.buyerToRemove, buyer.id];
      }
      if (selectAll) {
        this.dataSource.forEach(buyerElem => {
          buyerElem.isSelectedToRemove = true;
          if (buyerElem.id > 0 && !this.buyerToRemove.includes(buyerElem.id)) {
            this.buyerToRemove = [...this.buyerToRemove, buyerElem.id];
          }
        })
        this.buyers.forEach(buyerElem => {
          buyerElem.isSelectedToRemove = true;
        })
        this.table.renderRows();
      }
    } else {
      if(selectAll) {
        this.buyerToRemove = [];
        this.dataSource.forEach(buyerElem => {
          buyerElem.isSelectedToRemove = false;
        })
        this.buyers.forEach(buyerElem => {
          buyerElem.isSelectedToRemove = false;
        })
        this.table.renderRows();
      }
      this.removeAllBuyers = false;
      this.table.renderRows();
      if (this.buyerToRemove.length > 0) {
        this.buyerToRemove = this.buyerToRemove.filter((idBuyer) => buyer.id !== idBuyer)
      }
    }
  }
}
