import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sale} from "@app/_models/sale";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Offer} from "@app/_models/offer";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-closing-offer',
  templateUrl: './closing-offer.component.html',
  styleUrls: ['./closing-offer.component.scss']
})
export class ClosingOfferComponent implements OnInit {
  saleForm: FormGroup;
  sale = new Sale();
  offer: Offer;
  @ViewChild('confirmSwal')
  public readonly confirmSwal!: SwalComponent;
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>
              ) {
    if (this.data.offer) {
      this.offer = this.data.offer;
    }
    if(this.data.offer.sale) {
      this.sale = this.data.offer.sale;
    }
    this.initForm();
  }


  initForm() {
    this.saleForm = this.fb.group({
      sellingPrice: [this.sale.sellingPrice, [Validators.required, Validators.minLength(4)]],
      commission: [this.sale.commission, [Validators.required, Validators.minLength(4)]],
      soldAt: [this.sale.soldAt, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.saleForm.invalid) {
      this.snackBar
        .open('Des éléments du formulaire sont incorrects', 'ok');
      return;
    }
    this.confirmSwal.fire().then((result) => {
      if (result.isConfirmed) {
        this.sale = Object.assign(this.sale, this.saleForm.value);
        this.offer.sale = this.sale;
        this.dialogRef.close(this.offer);
      }
    });

  }

}
