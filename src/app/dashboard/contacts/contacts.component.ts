import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Contact} from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import { FileService } from '@app/_services/file.service';
import { Observable, Subscription } from 'rxjs';
import { FilterPipe } from '../filter.pipe';

/*const ELEMENT_DATA: Contact[] = [
  {id: 1, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 2, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 3, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 4, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 5, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 6, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 7, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 8, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 9, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
  {id: 10, name: "Mohamed", lastName: "Litib", adress: "35 avenue charle de gaules Paris", phone_number: "06 30 31 00 00", email:"m.litib@gmail.com", },
];*/

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
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
  public fileHolders$: Observable<File[]> = this.fileService.filesHolder$.asObservable();

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
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
  affiche() {
    this.newContact = true;
    this.detail = false;
    this.opened = !this.opened;
    console.log('detail', this.detail)
  }
  afficheAutre() {
    this.detail = true;
    this.newContact = false;
    this.opened = !this.opened;
    console.log('detail', this.detail)
  }
  addFiles($event) {

    const files = $event.target.files;
    this.fileService.addFile(files)
  }
  removeFile(index) {
    this.fileService.removeFile(index)
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }


  /*onSubmit() {
    this.product = Object.assign(this.product, this.productForm.value);
    const fd = new FormData();
    fd.append('product', JSON.stringify(this.product));
    if (this.medias.length > 0) {
      for (let i = 0; i < this.medias.length; i++) {
        fd.append('file[]', this.medias[i]);
      }
    }
    this.productService
      .updateProduct(fd)
      .subscribe((response) => {
        console.warn('response product', response);
      });
  }*/
}

