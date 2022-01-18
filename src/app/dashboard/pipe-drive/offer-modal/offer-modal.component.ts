import { Component, Inject, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from '@app/_models/offer';
import {OfferService} from "@app/_services/offer.service";
import {Buyer} from "@app/_models/buyer";

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  offers: Offer[];
  offer: Offer;
  buyers: Buyer[] = [];
  offerForm: FormGroup;
  addressForm: FormGroup;
  propertyForm: FormGroup;

  buyersForm = new FormArray([]);

  addBuyer() {
    const group = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(''),
      comment: new FormControl(''),
      customerType: new FormControl(''), // todo type society/particular
      budgetMin: new FormControl(''), // todo type society/particular
      budgetMax: new FormControl('') // todo type society/particular
    });
    this.buyersForm.push(group);
  }

  removeBuyer(index: number) {
    this.buyersForm.removeAt(index);
  }

  constructor(
    private offerService: OfferService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:{ offer: Offer},
    public dialogRef: MatDialogRef<OfferModalComponent>,

  ) { }

  ngOnInit(): void {
    if (this.data && this.data.offer) {
      this.offer = Object.assign(new Offer(), this.data.offer);
    }
    this.initForm()
  }


  initForm() {
    this.offerForm = this.formBuilder.group({
     title: [this.offer.title],
     status: [this.offer.status],
     sellingPropositionPrice: [this.offer.sellingPropositionPrice]
    });

    this.propertyForm = this.formBuilder.group({
      labelTypeProperty : [this.offer.property.labelTypeProperty],
      typeProperty: [this.offer.property.typeProperty],
      propertyRegime: [this.offer.property.propertyRegime],
      rentalStatus: [this.offer.property.rentalStatus],
      yield: [this.offer.property.yield],
      comment: [this.offer.property.comment],
      sellingPrice: [this.offer.property.sellingPrice],
    });


    this.addressForm = this.formBuilder.group({
      street: [this.offer.property.address.street],
      city: [this.offer.property.address.city],
      zipcode: [this.offer.property.address.zipcode],
      canton: [this.offer.property.address.canton],
      country: [this.offer.property.address.country]
    })
  }
  onSubmit(): void {
    this.offer = Object.assign(this.offer, this.offerForm.value);
    //
    this.offerService
      .updateOffer(this.offer)
      .subscribe((response: any) => {
        if(response.ok) {
          this.dialogRef.close(true);
        }
      });

  }
}
