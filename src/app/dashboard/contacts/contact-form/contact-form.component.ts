import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import { Subscription } from 'rxjs';
import {Buyer} from "@app/_models/buyer";
import {PropertyService} from "@app/_services/property.service";
import {BuyerService} from "@app/_services/buyer.service";
import {Address} from "@app/_models/address";
import {MatDrawer} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  newContact:boolean;
  @Input() public detail: boolean;
  @ViewChild('fileinput', { static: true }) inputRef: ElementRef;
  contactForm: FormGroup;
  @Input() public opened: boolean;
  @Output() closeSidenav = new EventEmitter<boolean>();
  url: string;
  buyerForm: FormGroup;
  addressForm: FormGroup;
  buyer: Buyer = new Buyer();
  address = new Address();
  cantons: any[] = [];
  //contacts: Contact[];
  contactSub: Subscription;
  sideDrawer: MatDrawer;
  //contact: Contact;
  //contacts: Contact[];
  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
    //public dialogRef: MatDialogRef<ContactFormComponent>,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');

      this.propertyService
        .getCantonList()
        .subscribe((response) => {
          this.cantons = response.cantons;
        });

      this.buyerService.buyerCurrent.subscribe((buyer) => {
        this.buyer = buyer;
        this.initForm(this.buyer);
      });
    })
  }
  initForm(buyer) {
    this.buyerForm = this.formBuilder.group({
      id: [buyer.id],
      name: [buyer.name],
      email: [buyer.email],
      comment: [buyer.comment],
      budgetMin: [buyer.budgetMin],
      budgetMax: [buyer.budgetMax],
      typeProperty: [buyer.typeProperty],
      areasDesired: [buyer.areasDesired],
      tags: [buyer.tags],
      phoneNumber: [buyer.phoneNumber],
      customerType: [buyer.customerType],
      propertyRegime: [buyer.propertyRegime]
    })

    if (buyer.areasDesired && buyer.areasDesired.length > 0) {
      const arr = buyer.areasDesired.split(',');
      this.buyerForm.get('areasDesired')
        .patchValue(arr);

    }
    if (buyer.typeProperty && buyer.typeProperty.length > 0) {
      const arr = buyer.typeProperty.split(',');
      const arrInt = arr.map((e) => +e);
      this.buyerForm.get('typeProperty')
        .patchValue(arrInt);
    }

    if (buyer.propertyRegime && buyer.propertyRegime.length > 0) {
      const arr = buyer.propertyRegime.split(',');
      const arrInt = arr.map((e) => +e);
      this.buyerForm.get('propertyRegime')
        .patchValue(arrInt);
    }


    /*this.address = buyer.address ? Object.assign(buyer.address, this.address) : new Address();
    this.addressForm = this.formBuilder.group({
        city: [this.address.city
        ],
        street: [ this.address.street
        ],
        country: [
          this.address.country
        ],
        zipcode: [
          this.address.zipcode
        ],
        canton: [
          this.address.canton
        ]
    });*/

  }
  onSubmit(): void {
    this.buyer = Object.assign(this.buyer, this.buyerForm.value);
    const buyerCurrent = Object.assign(new Buyer(), this.buyer);
    // buyerCurrent.address = Object.assign(this.address, this.addressForm.value);
    this.buyerService
      .updateBuyer(buyerCurrent)
      .subscribe((res) => {
        if (res.ok) {
          this.snackBar.open('Mise à jour avec succés', 'ok', {
            duration: 4500
          })
          this.closeSidenav.emit(true);
        }
      });
  }
  onSelectFile(e) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  openFile() {
    this.inputRef.nativeElement.click()
  }

}
