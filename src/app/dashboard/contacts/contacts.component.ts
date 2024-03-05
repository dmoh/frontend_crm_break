import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Contact} from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import { FileService } from '@app/_services/file.service';
import {Observable, Subscription, timer} from 'rxjs';
import { FilterPipe } from '../filter.pipe';
import {BuyerService} from '@app/_services/buyer.service';
import {debounceTime, distinctUntilChanged, startWith, take} from 'rxjs/operators';
import {Buyer} from '@app/_models/buyer';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {crmConstants} from '@app/_helpers/crm-constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PropertyService} from '@app/_services/property.service';

const DATA: any[] = [
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'En cours'},
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'En cours'},
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'En cours'},
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'Terminée'},
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'Terminée'},
  {commune: 'Lausanne', typologie: 'Habitation', adress: '35 avenue charle de gaules', proprietaire: 'Litib', numero: '06 30 31 00 00', observations: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,', statut: 'Terminée'},


];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Commune', 'Typologie', 'Adresse', 'Propriétaire', 'Numéro', 'Observations', 'Statut'];
  dataSource  = DATA;
  list = false;
  newContact: boolean;
  detail: boolean;
  contacts: Contact[] = [];
  contact: Contact;
  opened: boolean;
  contactSub: Subscription = new Subscription;
  nbContact;
  tab3;
  filter: FilterPipe;
  research = '';
  buyers: Buyer[] = [];
  allBuyers: Buyer[] = [];
  searchForm: FormGroup;
  crmConstants = crmConstants;
  showCancelButton = false;


  public fileHolders$: Observable<File[]> = this.fileService.filesHolder$.asObservable();
  showSpinner = true;
  privateBuyersIsChecked = false;
  institutionalBuyersIsChecked = false;
  searchFastCtrl = new FormControl();
  showAllBuyers = true;
  cantons: any[] = [];

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private buyerService: BuyerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private propertyService: PropertyService,
  ) {
    this.searchForm = this.fb.group({
      id: [null],
      name: [null],
      email: [null],
      phoneNumber: [null],
      budget: [null],
      areasDesired: [null],
      typeProperty: [null],
      hasBuildingLease: [null],
    });
  }
  ngOnInit(): void {
    this.getCantons();
    this.getBuyerList();
    this.buyerService
      .drawer
      .subscribe((res) => {
        this.opened = res;
        if (!res) {
          this.getBuyerList();
        }
      });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');
      this.contact = this.contactService.getContact(paramMap.get('index'));
    });
    this.contactSub.add(
      this.contactService.contact$.subscribe(
        (value: any[]) => {
          this.contacts = value;
          const tabLettre = this.contacts.sort((a, b) => {

            if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
            } else {
              return 1;
            }

          });
          /*for (let i=0; i < tabLettre.length; i++){
              if(tabLettre[i])
          }*/
          console.log(tabLettre, 'noms');
          const tab = this.contacts.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
              } else {
                return 1;
              }
         });
          const tab2 = tabLettre.map((lettre) => {
             return lettre.name.charAt(0);
          });
          this.tab3 = tab2.filter((item, index) => tab2.indexOf(item) === index);
        }));

    this.contactSub.add(
          this.contactService.contact$.subscribe(
            (value: Contact[]) => {
              this.nbContact = value.length;
            }
        )
      );
    timer(700).subscribe(_ => {
      this.onSearchFast();
    });

  }

  private getBuyerList() {
    this.buyerService
      .getBuyerList()
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response.ok) {
          this.buyers = response.buyers;
          this.allBuyers = response.buyers;
          // sort
        }
        this.showSpinner = false;
      })
    ;
  }

  affiche() {
    this.newContact = true;
    const buyer = new Buyer();
    this.buyerService.setBuyerCurrent(buyer);
    this.detail = false;
    this.opened = !this.opened;
  }
  afficheAutre(buyer) {
    this.detail = true;
    this.newContact = false;
    this.buyerService.setBuyerCurrent(buyer);
    this.opened = !this.opened;
  }
  addFiles($event) {
    const files = $event.target.files;
    this.fileService.addFile(files);
  }
  removeFile(index) {
    this.fileService.removeFile(index);
  }
  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  onSubmit() {
    const search = Object.assign({}, this.searchForm.value);
    if (
      !search.id
      && !search.name
      && !search.email
      && !search.phoneNumber
      && !search.budget
      && !search.areasDesired
      && !search.typeProperty
      && !search.hasBuildingLease
    ) {
      return;
    }
    this.buyerService
      .searchBuyersByParams(search)
      .pipe(take(1))
      .subscribe((res) => {
        if (res.buyers) {
          this.showCancelButton = true;
          this.buyers = res.buyers;
        } else {
          this.snackBar
            .open('Aucun résultat', 'ok' , {
              duration: 2500
            });
        }
      });

  }

  onCancelFilter() {
    this.showSpinner = true;
    this.searchForm.reset();
    this.searchFastCtrl.reset();
    this.showCancelButton = false;
    this.ngOnInit();
  }


  onSearchFast() {
    this.searchFastCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((val: string) => {
        this.buyers = this.allBuyers;
        if (this.institutionalBuyersIsChecked) {
          this.buyerFilter();
        }
        if (this.privateBuyersIsChecked) {
          this.buyerFilter(true);
        }
        if (val && (val.trim()).length > 0) {
          this.buyers = this.buyers?.filter((buyer: Buyer) => {
            if (buyer
              && buyer.name
              && ((buyer.name).toLowerCase()).includes(val.toLowerCase())
            ) {
              return buyer;
            }
          });
          if (this.buyers.length) {
            this.showCancelButton = true;
            setTimeout(() => {
              this.showSpinner = false;
              if (this.buyers.length) {
                this.snackBar.open('Filtre appliqué avec succès ! (' +  this.buyers.length + ' résultats)', 'ok');
              }
            }, 200);
          } else {
            this.snackBar.open('Aucun élément trouvé !', 'ok');
            this.showCancelButton = true;
            this.searchFastCtrl.reset();
          }
        } else {
          this.buyers = this.allBuyers;
          if (this.institutionalBuyersIsChecked) {
            this.buyerFilter();
          }
          if (this.privateBuyersIsChecked) {
            this.buyerFilter(true);
          }
        }
      });
  }


  onChangeStateDrawer(event: any) {
    if (event) {
      this.opened = true;
      this.buyerService
        .setStateDrawer(true);
    }
  }

  onUpdateFilter(typeChecked: string) {
    this.showSpinner = true;
    this.buyers = [...this.allBuyers];
    if (typeChecked === 'private') {
      this.showAllBuyers = false;
      this.privateBuyersIsChecked = true;
      this.institutionalBuyersIsChecked = false;
      this.buyerFilter(true);
      setTimeout(_ => {
        this.showSpinner = false;
      }, 700);
    } else if (typeChecked === 'institutional') {
      this.showAllBuyers = false;
      this.institutionalBuyersIsChecked = true;
      this.privateBuyersIsChecked = false;
      this.buyerFilter();
      setTimeout(_ => {
        this.showSpinner = false;
      }, 700);
    } else {
      this.showAllBuyers = true;
      this.buyers = this.allBuyers;
      setTimeout(_ => {
        this.showSpinner = false;
      }, 700);
    }
  }


  private buyerFilter(onlyPrivateBuyers = false) {
    if (onlyPrivateBuyers) {
      this.buyers = this.buyers.filter((buyer: Buyer) => {
        return buyer.customerType === crmConstants.CUSTOMER_TYPE_PRIVATE;
      });
    } else {
      this.buyers = this.buyers.filter((buyer: Buyer) => {
        return buyer.customerType === crmConstants.CUSTOMER_TYPE_INSTITUTIONAL;
      });
    }

  }


  buyerFilterParams() {
    const searchForm = this.searchForm.value;
    this.showCancelButton = true;
    this.showSpinner = true;
    console.log('search', searchForm);
    this.buyers = [...this.allBuyers];
    if (Object.values(searchForm).every((val) => !!val)) {
      setTimeout(_ => {
        this.showCancelButton = false;
        this.showSpinner = false;
        if (this.buyers.length) {
          this.snackBar.open('Aucun acheteur trouvé !', 'ok');
        }
      }, 1500);
      return;
    }
    if (this.institutionalBuyersIsChecked) {
      this.buyerFilter();
    }
    else if (this.privateBuyersIsChecked) {
      this.buyerFilter(true);
    } else {
      this.privateBuyersIsChecked = false;
      this.institutionalBuyersIsChecked = false;
      this.buyers = [...this.allBuyers];
    }
    this.buyers = this.buyers.filter((buyer, index) => {
      let isOk = false;
      if (searchForm.id && !isNaN(searchForm.id)) {
          if (+buyer.id === searchForm.id) {
            isOk = true;
          }
      }

      if (searchForm.areasDesired && searchForm.areasDesired.length && buyer.areasDesired && buyer.areasDesired.length ){
        if (buyer.areasDesired.includes(searchForm.areasDesired)){
          isOk = true;
        }
      }

      if (searchForm.name && searchForm.name.trim().length && buyer.name && buyer.name.length) {
        if (buyer.name.toLowerCase().includes(searchForm.name.toLowerCase())) {
          isOk = true;
        }
      }

      if (searchForm.budget && !isNaN(searchForm.budget)) {
        console.log('buyerBudget', searchForm.budget);
        if (
          !isNaN(buyer.budgetMin) &&
          !isNaN(buyer.budgetMax) &&
          +buyer.budgetMin > 0 &&
          +buyer.budgetMax > 0 &&
          +searchForm.budget >= +buyer.budgetMin &&
          +searchForm.budget <= +buyer.budgetMax
        ) {
          isOk = true;
        }
      }



      if (searchForm.hasBuildingLease) {
        console.log('searchForm.hasBuildingLease', searchForm.hasBuildingLease);
        if (buyer.hasBuildingLease) {
          isOk = true;
        }
      }


      if (searchForm.typeProperty && !isNaN(searchForm.typeProperty)) {
        console.log('buyerTypeProperte', buyer.typeProperty);
        if (
          buyer.typeProperty &&
          buyer.typeProperty.includes(searchForm.typeProperty)
        ) {
          isOk = true;
        }
      }


      if (isOk) {
        return buyer;
      }
    });

    setTimeout(() => {
      this.showSpinner = false;
      if (this.buyers.length) {
        this.snackBar.open('Filtre appliqué avec succès ! (' +  this.buyers.length + ' résultats)', 'ok');
      }
    }, 1500);
  }


  getCantons() {
    this.propertyService
      .getCantonList()
      .subscribe((response) => {
        this.cantons = response.cantons;
      });
  }

}

