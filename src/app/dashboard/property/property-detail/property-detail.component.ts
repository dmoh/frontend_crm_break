import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {crmConstants} from "@app/_helpers/crm-constants";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Property} from "@app/_models/property";
import {FileService} from "@app/_services/file.service";
import {Address} from "@app/_models/address";
import {PropertyService} from "@app/_services/property.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Owner} from "@app/_models/owner";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  crmConstants = crmConstants;
  propertyForm: FormGroup;
  files: (File | unknown[])[] = [];
  filesRentalStatus: (File | unknown[])[] = [];
  filesDetailedManagementAccount: (File | unknown[])[] = [];
  filesExtractLandRegister: (File | unknown[])[] = [];
  filesBuildingInsurance: (File | unknown[])[] = [];
  filesListOfWorks: (File | unknown[])[] = [];
  filesPhotos: (File | unknown[])[] = [];
  filesBuildingPlans: (File | unknown[])[] = [];
  address: Address = new Address();
  propertyAddressForm: FormGroup;
  ownerForm: FormGroup;

  medias = [];
  @Input() property: Property = new Property();
  @Input() isOnOfferModal = false;
  @Output() showNextButton: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('rentalStatus') rentalStatus;
  @ViewChild('detailedManagementAccount') detailedManagementAccount;
  @ViewChild('extractLandRegister') extractLandRegister;
  @ViewChild('buildingInsurance') buildingInsurance;
  @ViewChild('buildingPlans') buildingPlans;
  @ViewChild('listOfWorks') listOfWorks;
  @ViewChild('photos') photos;
  showOnly = false;

  constructor(
    private fileService: FileService,
    private propertyService: PropertyService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.showOnly) {
      this.showOnly = this.data.showOnly;
    }
    this.initForm();
  }

  private initForm() {
    this.propertyForm = this.fb.group({
      labelTypeProperty: [this.property.labelTypeProperty],
      typeProperty: [this.property.typeProperty, [Validators.required]],
      propertyRegime: [this.property.propertyRegime, [Validators.required]],
      rentalStatus: [this.property.rentalStatus],
      yield: [this.property.yield],
      comment: [this.property.comment],
      sellingPrice: [this.property.sellingPrice],
      owner: [this.property.owner],
      ownerName: [this.property.ownerName],
      hasRentalStatus: [this.property.hasRentalStatus],
      hasDetailedManagementAccount: [this.property.hasDetailedManagementAccount],
      hasExtractLandRegister: [this.property.hasExtractLandRegister],
      hasBuildingInsurance: [this.property.hasBuildingInsurance],
      hasPhotos: [this.property.hasPhotos],
      hasBuildingPlans: [this.property.hasBuildingPlans],
      hasListOfWorks: [this.property.hasListOfWorks],
      hasBuildingLease: [this.property.hasBuildingLease]
    });
    this.propertyAddressForm = this.fb.group({
      street: [this.property.address.street],
      city: [this.property.address.city],
      zipcode: [this.property.address.zipcode],
      canton: [this.property.address.canton, [Validators.required]],
      country: [this.property.address.country]
    });
    this.ownerForm = this.fb.group({
      name: new FormControl(this.property.owner.name, [Validators.required]),
      email: new FormControl(this.property.owner.email, [Validators.required]),
      phoneNumber: new FormControl(this.property.owner.phoneNumber),
      comment: new FormControl(this.property.owner.comment),
      customerType: new FormControl(this.property.owner.customerType), // todo type society/particula
    });
    this.propertyForm
      .get('hasRentalStatus')
      .valueChanges
      .subscribe((val) => {
        this.property.hasRentalStatus = !!val;
      });
    this.propertyForm
      .get('hasDetailedManagementAccount')
      .valueChanges
      .subscribe((val) => {
        this.property.hasDetailedManagementAccount = !!val;
      });
    this.propertyForm
      .get('hasExtractLandRegister')
      .valueChanges
      .subscribe((val) => {
        this.property.hasExtractLandRegister = !!val;
      });
    this.propertyForm
      .get('hasBuildingInsurance')
      .valueChanges
      .subscribe((val) => {
        this.property.hasBuildingInsurance = !!val;
      });
    this.propertyForm
      .get('hasBuildingPlans')
      .valueChanges
      .subscribe((val) => {
        this.property.hasBuildingPlans = !!val;
      });
    this.propertyForm
      .get('hasListOfWorks')
      .valueChanges
      .subscribe((val) => {
        this.property.hasListOfWorks = !!val;
      });
    this.propertyForm
      .get('hasPhotos')
      .valueChanges
      .subscribe((val) => {
        this.property.hasPhotos = !!val;
      });
  }
  ngOnInit(): void {
    this.propertyService
      .propertyCurrent
      .subscribe((property: any) => {
        this.property = property;
        if (+this.property.id > 0) {
          this.propertyService
            .getMediasProperty(this.property.id)
            .subscribe((res) => {
              if (res.medias) {
                  this.medias = res.medias;
                  this.filesPhotos = this.medias.filter((media) => media.typeMedia === 'photos');
                  this.filesRentalStatus = this.medias.filter((media) => media.typeMedia  === 'rentalStatus');
                  this.filesDetailedManagementAccount = this.medias.filter((media) => media.typeMedia === 'detailedManagementAccount');
                  this.filesExtractLandRegister = this.medias.filter((media) => media.typeMedia === 'extractLandRegister');
                  this.filesBuildingInsurance = this.medias.filter((media) => media.typeMedia === 'buildingInsurance');
                  this.filesListOfWorks = this.medias.filter((media) => media.typeMedia === 'listOfWorks');
                  this.filesBuildingPlans = this.medias.filter((media) => media.typeMedia === 'buildingPlans');
              }
            })
        }

        console.warn(this.property);
        if (!property.address) {
          this.address.street = property.street;
          this.address.city = property.city;
          this.address.canton = property.canton;
          this.address.zipcode = property.zipcode;
          this.property.address = Object.assign(new Address(), this.address);
        }
        if (!property.owner) {
          this.property.owner = new Owner();
          this.property.owner.name = property.owners ;
          this.property.owner.phoneNumber = property.phoneNumber;
          this.property.owner.email = property.email ;
          this.property.owner.customerType = property.customerType;
        }
        this.initForm();
        this.calculateYield();
      });
  }


  onSelect(event: any, typeFile: string) {
    if (event.target.files && event.target.files.length > 0) {
      const fileList = event.target.files;
      const arrayFile = Array.from(fileList);
      this.files = [arrayFile];
    }
    switch (typeFile) {
      case 'rentalStatus':
        this.filesRentalStatus = this.files;
        break;
      case 'detailedManagementAccount':
        this.filesDetailedManagementAccount = this.files;
        break;
      case 'extractLandRegister':
        this.filesExtractLandRegister = this.files;
        break;
      case 'buildingInsurance':
        this.filesBuildingInsurance = this.files;
        break;
      case 'listOfWorks':
        this.filesListOfWorks = this.files;
        break;
      case 'photos':
        this.filesPhotos = this.files;
        break;
      case 'buildingPlans':
        this.filesBuildingPlans = this.files;
        break;
    }


  }

  onRemove(event, typeFile: string) {

    this[typeFile].nativeElement.value = null;
    // this.fileInputRental.nativeElement.value = null;
    switch (typeFile) {
      case 'rentalStatus':
        this.filesRentalStatus = [];
        break;
      case 'detailedManagementAccount':
        this.filesDetailedManagementAccount = [];
        break;
      case 'extractLandRegister':
        this.filesExtractLandRegister = [];
        break;
      case 'buildingInsurance':
        this.filesBuildingInsurance = [];
        break;
      case 'listOfWorks':
        this.filesListOfWorks = [];
        break;
      case 'photos':
        this.filesPhotos = [];
        break;
      case 'buildingPlans':
        this.filesBuildingPlans = [];
        break;
    }
  }

  onSubmit() {
    // traitement des fichiers
    const fd = new FormData();

    if (this.filesRentalStatus.length > 0) {
      let files = [];
      console.warn(this.filesRentalStatus);

      files = [...this.filesRentalStatus];
      console.warn( [files,files[0]]);
      if(files[0].length > 0) {
        console.warn('im here');
        files[0].forEach((file) => {
          console.warn('file intere', file);
          fd.append('filesRentalStatus[]', file);
        });
      }


    }
    if (this.filesDetailedManagementAccount.length > 0) {
      let files = [];
      files = [...this.filesDetailedManagementAccount];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesDetailedManagementAccount[]', file);
        });
      }
    }

    if (this.filesExtractLandRegister.length > 0) {
      let files = [];
      files = [...this.filesExtractLandRegister];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesExtractLandRegister[]', file);
        });
      }
    }
    if (this.filesBuildingInsurance.length > 0) {
      let files = [];
      files = [...this.filesBuildingInsurance];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesBuildingInsurance[]', file);
        });
      }
    }

    if (this.filesBuildingPlans.length > 0) {
      let files = [];
      files = [...this.filesBuildingPlans];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesBuildingPlans[]', file);
        });
      }
    }
    if (this.filesListOfWorks.length > 0) {
      let files = [];
      files = [...this.filesListOfWorks];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesListOfWorks[]', file);
        });
      }
    }

    if (this.filesPhotos.length > 0){
      let files = [];
      files = [...this.filesPhotos];
      if(files[0].length > 0) {
        files[0].forEach((file) => {
          fd.append('filesPhotos[]', file);
        });
      }
    }

    this.property = Object.assign(this.property, this.propertyForm.value);
    this.calculateYield(true);
    this.property.address = Object.assign(this.property.address, this.propertyAddressForm.value);
    this.property.owner = Object.assign(this.property.owner, this.ownerForm.value);
    fd.append('property', JSON.stringify(this.property));

    this.propertyService
      .updateToProperty(fd)
      .subscribe((res) => {
        let msg = '';
        if (res.ok) {
          this.property = res.property;
          this.propertyService
            .setPropertyCurrent(this.property);
          if (this.isOnOfferModal) {
            msg = "Propriété mise à jour, bouton 'Suivant' actif";
            this.showNextButton.next(true);
          } else {
            msg = "Propriété mise à jour";
            this.dialogRef.close(true);
          }
        }
        this.snackBar.open(msg, 'ok', {
          duration: 3000
        })
      });

  }

  onRemoveMedia(id: number, typeMedia: string) {
    this.propertyService
      .deleteMediaToProperty(id)
      .subscribe((res) => {
        if (res.ok) {
          this[typeMedia] = this[typeMedia].filter((elem) => +elem.id !== +id);
          this.snackBar.open('Le fichier a été supprimé', 'ok', {
            duration: 2500
          });
        }
      });
  }


  private calculateYield(isSubmitted = false) {
    this.propertyForm
      .get('yield')
      .disable();
    this.propertyForm.get('sellingPrice')
      .valueChanges
      .subscribe((sellingPrice) => {
        this.propertyForm.get('rentalStatus')
          .valueChanges
          .subscribe((rentalStatus) => {
            if (+sellingPrice > 0 && +rentalStatus > 0) {
              const yieldCalculate = ((+rentalStatus / +sellingPrice) * 100);
              this.propertyForm.get('yield')
                .patchValue(yieldCalculate.toFixed(2));
            }
          })
      });
    this.propertyForm.get('rentalStatus')
      .valueChanges
      .subscribe((sellingPrice) => {
        this.propertyForm.get('sellingPrice')
          .valueChanges
          .subscribe((rentalStatus) => {
            if (+sellingPrice > 0 && +rentalStatus > 0) {
              const yieldCalculate = Math.round((+rentalStatus / +sellingPrice) * 100);
              this.propertyForm.get('yield')
                .patchValue(yieldCalculate);
            }
          })
      });
    if (isSubmitted) {
      const sellingPrice = this.propertyForm.get('sellingPrice')
        .value;
      const rentalStatus = this.propertyForm.get('rentalStatus')
        .value;

      if (sellingPrice && rentalStatus && +sellingPrice > 0 && +rentalStatus > 0) {
        if (+sellingPrice > 0 && +rentalStatus > 0) {
          const yieldCal = ((+rentalStatus / +sellingPrice) * 100);
          this.property.yield = yieldCal.toFixed(2);
        }
      }
    }
  }
}
