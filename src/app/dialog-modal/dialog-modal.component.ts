import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Ad } from '../dashboard/models/ad';
import { DashboardService } from '../dashboard/dashboard.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Contact } from '../dashboard/models/contact';
import { CustomValidator } from '../dashboard/custom-validator';
import { MatOption } from '@angular/material/core';
import { MatListOption } from '@angular/material/list';
import { Category } from '@app/dashboard/ads/models/category';
import { element } from 'protractor';
import { Console } from 'console';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogModalComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tagAdCurrent: string[] = [];
  tags: any[] = [];
  contactEmailCtrl = new FormControl();
  filteredTags: Observable<Category[]>;
  categories: Category[] = [];
  filteredContactEmail: Observable<Contact[]>;
  emails: Contact[] = [];
  emailsSelected: Contact[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emailList: Contact[] = [];
  files: any[] = [];
  //file: File
  globalForm: FormGroup;
  localisationForm: FormGroup;
  docsForm: FormGroup;
  contactForm: FormGroup;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('emailLists') emaills: MatOption[];
  contacts: FormArray;
  superficie: number = this.ad.area;
  pieces: number = this.ad.rooms;
  chambre: number = this.ad.bedrooms;
  bathroom: number = this.ad.bathroom;
  wc: number = this.ad.wc;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<DialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public ad: Ad,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {
    this.filteredTags = this.dashboardService.getCategories();
    this.dashboardService.getCategories().subscribe(
      (cat) => {
        this.categories = cat;
        if (this.categories) {
          console.warn(this.categories);
          const tas = this.categories;
          tas.forEach((element) => {
            const tag = element.tags.split(',');
            if (tag.length > 1) {
              tag.forEach((elem) => {
                const tagElement = elem.trim();
                if (tagElement.length > 0) {
                  this.tags.push(tagElement);
                }
              });
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.filteredContactEmail = this.contactEmailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) =>
        email ? this._filter(email) : this.emailList.slice()
      )
    );
  }

  onNoClick(message: {}): void {
    this.dialogRef.close(message);
  }

  ngOnInit(): void {
    if (this.ad.id === 0) {
      this.createForm('ad', 'update');
    } else {
      this.createForm('ad', 'add');
    }
    if (this.ad.tags) {
      // tags (themes) en lien avec l'annonce courante
      if (this.ad.tags.length !== 0) {
        if (typeof this.ad.tags === 'object') {
          this.tags = this.ad.tags;
        } else {
          this.tags = this.ad.tags.split(',');
        }
      }
    }

    this.dashboardService.getContactList().subscribe((emails: Contact[]) => {
      this.emails = emails;
    });

    // this.ad.contacts[0] = { email: 'mail@ndfd.fr'};
  }

  createForm(formType: string, action: string): void {
    switch (formType) {
      case 'ad':
        if (action === 'add' || action === 'update') {
          this.globalForm = this.fb.group({
            description: this.fb.group({
              title: [this.ad.title], //Validators.required],
              type: [this.ad.type], //Validators.required],
              category: [this.ad.category], //Validators.required],
              comment: [this.ad.comment], //Validators.required],
              description: [this.ad.description],
              amount: [this.ad.amount], //Validators.required],

              published: [this.ad.published],
              show_amount: [this.ad.show_amount],
              tags: [this.ad.tags],
              user_id: [this.ad.user_id],
              assets: [this.ad.assets],
              contacts: [this.ad.contacts],
            }),

            location: this.fb.group({
              country: [this.ad.country], //Validators.required],
              city: [this.ad.city], //Validators.required],
              zipcode: [this.ad.zipcode], //Validators.required],
              street: [this.ad.street], //Validators.required],
            }),
            characteristics: this.fb.group({
              area: [this.ad.area], //Validators.required],
              rooms: [this.ad.rooms], //Validators.required],
              bedrooms: [this.ad.bedrooms],
              bathroom: [this.ad.bathroom], //Validators.required],
              wc: [this.ad.wc],
              //location : [this.ad.location],
              handicap_accessibility: [this.ad.handicap_accessibility],
              equipment: [this.ad.equipment],
              sold: [this.ad.sold],
            }),
            /*documents: this.fb.array([
                    this.fb.control('')]),*/
          });
          //this.localisationForm = this.fb.group({})
          this.docsForm = this.fb.group({
            image: [this.ad.image],
          });
          this.contactForm = this.fb.group({
            contacts: this.fb.group({
            lastName: [this.contact.lastName],
            name: [this.contact.name],
            //adress: [this.contact.adress],
            phone_number: [this.contact.phone_number],
            emails: [this.contact.email],
            //mails: new FormArray([], CustomValidator.validateEmails)
            })
          });
        }
        this.contacts = this.contactForm.get('emails') as FormArray;
        // this.globalForm.registerControl('skills', new FormArray());
      break;
    }
  }
  addEmail() {
    const control = new FormControl('', Validators.required);
    this.contacts.push(control);
  }

  get documents() {
    return this.globalForm.get('documents') as FormArray;
  }

  get tagsAd() {
    return this.globalForm.get('tags') as FormArray;
  }

  onSubmit(): void {
    //this.ad = Object.assign(this.ad, this.globalForm.value);
    const add = Object.assign(
      this.globalForm.value,
      this.docsForm.value,
      this.contactForm.value
    );
    console.log('AD', add);
    const key = Object.keys(add);
    //console.warn(key);
    key.forEach((elem) => {
      this.ad[elem] = null ?? '';
    });
    this.ad.tags = 'test';
    this.ad.published = null || '' ? false : true;
    const data = new FormData();
    data.append('ad', JSON.stringify(add));
    if (this.files.length > 0) {
      //this.ad.image = this.file.name;
      for (const file of this.files) {
        data.append(`file_${file.idFile}`, file.fileUpload, file.name);
      }
    }
    if (this.emailsSelected.length > 0) {
    }
    this.dashboardService.updateAd(data).subscribe((result) => {
      this.onNoClick({ success: "L'annonce a été mise à jour" });
    });
    console.log(data, 'data');
    //console.log(this.globalForm.value, 'global', this.docsForm.value,"docs", this.contactForm.value, "contact")
    // this.ad.tags = this.tagAdCurrent.join(',');
    // this.ad.user_id = 1; // TODO USERID !!!!!
  }
  onGroupEmailChange(options: MatListOption[]) {
    //console.log('emailChange', options.map(o => o.value));
    this.emailsSelected = options.map((o) => o.value);
    console.log('emailSelect', this.emailsSelected);
  }

  /*add(choice: string) {
        if(choice === 'tag'){
            this.tags.push(this.fb.control(''));
        } else {
            this.documents.push(this.fb.control(''));
        }
    }*/

  add(event: MatChipInputEvent, type?: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (type) {
        const contact = new Contact();
        contact.email = value;
        this.emails.push(contact);
      } else {
        if (this.tagAdCurrent.indexOf(value) === -1) {
          this.tagAdCurrent.push(value.trim());
        }
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addContactEmail(event): void {
    const input = event.input;
    const value = event.value;
    if (value.trim() !== '') {
      this.emails.push(value);
      this.contactEmailCtrl.setValue(null);
      // this.globalForm.controls['contact'].markAsDirty();
      input.value = '';
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newMail = new Contact();
    console.log('newMail', newMail)
    newMail.email = event.option.viewValue;
    this.emails.push(newMail);
    // this.fruitInput.nativeElement.value = '';
    this.contactEmailCtrl.setValue(null);
    0;
  }

  remove(tag: string, isEmail?: boolean): void {
    if (isEmail) {
      const index = this.emails.findIndex(
        (x) => x.email.toLowerCase().trim() === tag.toLowerCase().trim()
      );
      if (index >= 0) {
        this.emails.splice(index, 1);
      }
    } else {
      const index = this.tagAdCurrent.indexOf(tag);
      if (index >= 0) {
        this.tagAdCurrent.splice(index, 1);
      }
    }
  }

  private _filter(value: string): Contact[] {
    const filterValue = value.toLowerCase();
    return this.emailList.filter(
      (emailTable) => emailTable.email.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onUploadFile(event): void {
    console.log(event.target.files);
    const filesU = event.target.files;
    if (filesU.length === 1) {
      const file = event.target.files[0];
      if (file.name.trim() !== '') {
        const nbFile = this.files.length;
        this.files = [
          ...this.files,
          {
            idFile: nbFile,
            fileUpload: file,
          },
        ];
      }
    } else if (filesU.length > 1) {
      for (let i = 0; i < filesU.length; i++) {
        const nbFiles = this.files.length;
        this.files = [
          ...this.files,
          {
            idFile: nbFiles,
            fileUpload: filesU[i],
          },
        ];
      }
    }
  }

  onDeleteFile(file: any): void {
    this.files = this.files.filter((fileSelected) => {
      return file.idFile !== fileSelected.idFile;
    });
  }
}
