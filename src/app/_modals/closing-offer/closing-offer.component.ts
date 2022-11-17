import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sale} from "@app/_models/sale";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Offer} from "@app/_models/offer";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from "rxjs/operators";
import {BuyerService} from "@app/_services/buyer.service";
import {PropertyService} from "@app/_services/property.service";

@Component({
  selector: 'app-closing-offer',
  templateUrl: './closing-offer.component.html',
  styleUrls: ['./closing-offer.component.scss']
})
export class ClosingOfferComponent implements OnInit {
  saleForm: FormGroup;
  sale = new Sale();
  offer: Offer;
  isLoading = false;
  buyerNameCtrl = new FormControl();
  @ViewChild('confirmSwal')
  public readonly confirmSwal!: SwalComponent;
  filteredOptions: any[] = [];
  private findBuyer: boolean = true;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private propertyService: PropertyService,
              private buyerService: BuyerService,
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
      soldAt: [this.sale.soldAt, [Validators.required]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.findBuyerByName();
    }, 150)
  }

  onSubmit() {
    const officialBuyer = this.buyerNameCtrl.value;
    if (this.saleForm.invalid || !officialBuyer.id || +officialBuyer.id === 0 ) {
      this.snackBar
        .open('Des éléments du formulaire sont incorrects', 'ok');
      return;
    }
    this.confirmSwal.fire().then((result) => {
      if (result.isConfirmed) {
        this.sale = Object.assign(this.sale, this.saleForm.value);
        this.sale.buyerId = officialBuyer.id;
        this.offer.sale = this.sale;
        this.dialogRef.close(this.offer);
      }
    });

  }


  findBuyerByName() {
    this.buyerNameCtrl
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
          this.propertyService.getPotentialBuyerByName(value, this.findBuyer)
            .pipe(
              finalize(() => this.isLoading = false),
            )
        )
      )
      .subscribe(res => {
        console.warn('res potential', res);
        // @ts-ignore
        if (res.buyers) {
          // @ts-ignore
          this.filteredOptions = res.buyers;
        }
      });
  }


  displayFn(option: any) {
    if (option) {
      return option.name;
    }
  }


  onChange(option) {
    this.findBuyer = false;
    setTimeout(_ => this.findBuyer = true, 2500);
  }
}
