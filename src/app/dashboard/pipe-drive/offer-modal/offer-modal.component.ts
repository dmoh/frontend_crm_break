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


  dataSource = [];
  displayedColumns: string[] = ['removeBuyer', 'fullname', 'email', 'actions'];

  @ViewChild('propertyInput') propertyInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Buyer>;
  sendMailBuyersCtrl: FormControl = new FormControl();
  ownerNameCtrl: FormControl = new FormControl();
  enableNextButton = false;
  private findOwners: boolean = true;
  buyerNameCtrl = new FormControl();

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
    /*

        this.propertyForm = this.formBuilder.group({
          labelTypeProperty: [this.offer.property.labelTypeProperty],
          typeProperty: [this.offer.property.typeProperty],
          propertyRegime: [this.offer.property.propertyRegime],
          rentalStatus: [this.offer.property.rentalStatus],
          yield: [this.offer.property.yield],
          comment: [this.offer.property.comment],
          sellingPrice: [this.offer.property.sellingPrice],
          owner: [this.offer.property.owner],
          ownerName: [this.offer.property.ownerName],
        });


        if (!this.offer.property.address) {
          this.offer.property.address = new Address();
          if(this.offer.property.street) {
            this.offer.property.address.street = this.offer.property.street;
          }
          if(this.offer.property.city) {
            this.offer.property.address.city = this.offer.property.city;
          }
          if(this.offer.property.zipcode) {
            this.offer.property.address.zipcode = this.offer.property.zipcode;
          }
          if(this.offer.property.canton) {
            this.offer.property.address.canton = this.offer.property.canton;
          }
        }
        this.propertyAddressForm = this.formBuilder.group({
          street: [this.offer.property.address.street],
          city: [this.offer.property.address.city],
          zipcode: [this.offer.property.address.zipcode],
          canton: [this.offer.property.address.canton],
          country: [this.offer.property.address.country]
        });
    */

    this.initOwnerForm();
    /*this.ownerForm = this.formBuilder.group({
      name: new FormControl(this.offer.property.owner.name, [Validators.required]),
      email: new FormControl(this.offer.property.owner.email, [Validators.required]),
      phoneNumber: new FormControl(this.offer.property.owner.phoneNumber),
      comment: new FormControl(this.offer.property.owner.comment),
      customerType: new FormControl(this.offer.property.owner.customerType), // todo type society/particular
      budgetMin: new FormControl(''), // todo type society/particular
       budgetMax: new FormControl('') // todo type society/particular
    });*/
    /*
        this.propertyForm
          .get('typeProperty')
          .valueChanges
          .subscribe((val) => {
            if (this.property
              && this.property.labelTypeProperty
              && val
              && +val > 0
            ) {
              this.property.labelTypeProperty = Helper.getLabelTypePropertyByValue(val);
            }

          });*/
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
           /*&& response.buyers.length > 0 ?
            response.buyers.filter((elem) =>
              elem.email && elem.email.length > 4
            ) : [];*/
          this.dataSource = [...this.buyers];
          // this.dataSource.sort = this.sort;

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
        console.warn('res potential', res);
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

  onChangeTypeProperty() {

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
          this.snackBar.open('Offre supprimé avec succès', 'ok', {
            duration: 2500
          });
          this.dialogRef.close({offerId: id});
        }
      })
  }

  private assignOffer(): void {
    this.offer = Object.assign(this.offer, this.offerForm.value);
    // this.offer.property = this.property;

    /*this.offer.property = Object.assign(this.offer.property, this.propertyForm.value);
    this.offer.property.address = Object.assign(this.offer.property.address, this.propertyAddressForm.value);
    if (!this.offer.property.owner) {
      this.initOwnerForm();
    }
    this.offer.property.owner = Object.assign(this.offer.property.owner, this.ownerForm.value);*/
    this.offer.property.sellingPrice = this.offer.sellingPropositionPrice;
  }

  private calculateYield() {
    /*this.propertyForm
      .get('yield')
      .disable();
    this.propertyForm.get('sellingPrice')
      .valueChanges
      .subscribe((sellingPrice) => {
        this.propertyForm.get('rentalStatus')
          .valueChanges
          .subscribe((rentalStatus) => {
            if (+sellingPrice > 0 && +rentalStatus > 0) {
              const yieldCalculate = Math.round((+rentalStatus / +sellingPrice) * 100);
              this.propertyForm.get('yield')
                .patchValue(yieldCalculate);
            }
          })
      });*/
  }

  private mergeProperty(property: any) {
    console.warn('owner MErge', property);
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
    console.warn(property.owners);
    console.warn(this.property);
    //this.property = property;
    console.warn('dsdsds', this.property);

    this.offer.property = Object.assign(this.offer.property, this.property);
    //setter les éléments
    this.offer.property.ownerName = property.owners;
    this.offer.property.yield = this.property.yield;
    console.warn(this.offer);

    /*this.setValuesForm('address', 'street', property.street);
    this.setValuesForm('address', 'city', property.city);
    this.setValuesForm('address', 'canton', property.canton);
    this.setValuesForm('address', 'zipcode', property.zipcode);
    this.setValuesForm('address', 'country', property.country);
    this.setValuesForm('owner', 'name', property.owners);
    this.setValuesForm('property', 'typeProperty', property.propertyType);*/
    console.warn('prop', this.offer);
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
          if (value && value.length > 0 && value.trim().length > 3) {
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
        console.warn('res potential', res);
        // @ts-ignore
        if (res.buyers) {
          // @ts-ignore
          this.filteredOptionsB = res.buyers;
        }
      });
  }
  onChangeB(option) {
    console.warn('option selected', option);
    this.buyers = [option, ...this.buyers];
    this.dataSource.push(option);
    this.table.renderRows();
    this.findBuyer = false;
    setTimeout(_ => this.findBuyer = true, 2500);
  }

  onRemoveBuyer(id) {
    this.dataSource = this.dataSource.filter(buyer => +buyer.id !== +id);
    this.buyers = this.buyers.filter(buyer => +buyer.id !== +id);
    this.table.renderRows();
  }
}
