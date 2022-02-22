import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Contact} from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import { FileService } from '@app/_services/file.service';
import { Observable, Subscription } from 'rxjs';
import { FilterPipe } from '../filter.pipe';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {BuyerService} from "@app/_services/buyer.service";
import {map, take} from "rxjs/operators";
import {Buyer} from "@app/_models/buyer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSnackBar} from "@angular/material/snack-bar";

const DATA: any[] = [
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'En cours'},
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'En cours'},
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'En cours'},
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'Terminée'},
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'Terminée'},
  {commune: "Lausanne", typologie: "Habitation", adress: "35 avenue charle de gaules", proprietaire: "Litib", numero: "06 30 31 00 00", observations:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nemo,", statut: 'Terminée'},


];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['Commune', 'Typologie', 'Adresse', 'Propriétaire', 'Numéro', 'Observations', 'Statut'];
  //dataSource : MatTableDataSource<any> = new MatTableDataSource();
  dataSource  = DATA;
  list: boolean = false;
  tab: boolean = false;
  newContact: boolean;
  detail: boolean;
  contacts: Contact[] = [];
  contact: Contact;
  opened:boolean;
  contactSub: Subscription = new Subscription;
  nbContact;
  tab3;
  tabLettres;
  lettres;
  filter: FilterPipe;
  research = '';
  buyers: Buyer[] = [];
  searchForm: FormGroup;
  crmConstants = crmConstants;
  showCancelButton = false;


  public fileHolders$: Observable<File[]> = this.fileService.filesHolder$.asObservable();
  showSpinner = true;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private buyerService: BuyerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      id: [null],
      name: [null],
      email: [null],
      phoneNumber: [null],
      budget: [null],
      areasDesired: [null],
      typeProperty: [null],
    });
  }
  ngOnInit(): void {
    this.getBuyerList();
    this.buyerService
      .drawer
      .subscribe((res) =>{
        this.opened = res;
      });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');
      console.log("index", index)
      this.contact = this.contactService.getContact(paramMap.get('index'));
    })
      this.contactSub.add(
      this.contactService.contact$.subscribe(
        (value: any[]) => {
          this.contacts = value;
          console.log(this.contacts, 'contacts');

          const tabLettre = this.contacts.sort((a, b) => {

            if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1
            } else {
              return 1
            }

          })
          /*for (let i=0; i < tabLettre.length; i++){
              if(tabLettre[i])
          }*/
          console.log(tabLettre, 'noms')
          const tab = this.contacts.sort((a, b) => {
            if (a.name < b.name) {
              return -1
              } else {
                return 1
              }
         })
          const tab2 = tabLettre.map((lettre) => {
             return lettre.name.charAt(0)
          })
          console.log(tab2, 'lettres')
          this.tab3 = tab2.filter((item, index) => tab2.indexOf(item) === index)
          console.log(this.tab3, "tabLtrié")
        }))

        this.contactSub.add(
          this.contactService.contact$.subscribe(
            (value: Contact[]) => {
              this.nbContact = value.length;
            }
        )
      )


  }

  ngAfterViewInit() {
  }


  private getBuyerList() {
    this.buyerService
      .getBuyerList()/*
      .pipe(take(1),
        map((response: any) => {
          console.warn('response buyers', response);
          if (response.buyers) {
            this.buyers = response.buyers;
          }
        })
      )*/
      .subscribe((response: any) => {
        if (response.ok) {
          console.warn('resp buyer', response);
          this.buyers = response.buyers;
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
    this.fileService.addFile(files)
  }
  removeFile(index) {
    this.fileService.removeFile(index)
  }
  openList() {
  }
  openTab() {

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
    ) {
      return;
    }


    this.buyerService
      .searchBuyersByParams(search)
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
    this.showCancelButton = false;
    this.ngOnInit();
  }



  onChangeStateDrawer(event: any) {
    if (event) {
      this.opened = true;
      this.buyerService
        .setStateDrawer(true);
    }
  }
}

