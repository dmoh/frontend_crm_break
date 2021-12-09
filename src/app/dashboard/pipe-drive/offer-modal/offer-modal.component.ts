import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from '@app/dashboard/models/offer';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent implements OnInit {
  offers: Offer[];
  //offer: Offer;
  offerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
    public dialogRef: MatDialogRef<OfferModalComponent>
  ) { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm(
    offer: Offer = { offerName: "", name: "", lastName:"", amount:null, step:""}
    ) {
    this.offerForm = this.formBuilder.group({
     offer: [offer.offerName],
      name: [offer.name],
      lastName: [offer.lastName],
      amount: [offer.amount],
      step: [offer.step]
    })
  }
  onSubmit(): void {
    const newOffer = this.offerForm.value;
    //
    this.dialogRef.close(newOffer)
    console.log(' new offer', newOffer)
  }
}
