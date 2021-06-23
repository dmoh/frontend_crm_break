import {Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Ad} from '../dashboard/models/ad';
import {DashboardService} from '../dashboard/dashboard.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Contact} from '../dashboard/models/contact';
import {CustomValidator} from '../dashboard/custom-validator';
import {MatOption} from '@angular/material/core';
import {MatListOption} from '@angular/material/list';
import {Category} from '@app/dashboard/ads/models/category';
import {element} from "protractor";


@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
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
    emails: Contact[] =  [];
    emailsSelected: Contact[] = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    emailList: Contact[] = [];
    files: any[] = [];

    globalForm: FormGroup;
    contactForm: FormGroup;
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('emailLists') emaills: MatOption[];
    contacts: FormArray;


  constructor(
        private fb: FormBuilder,
        private dashboardService: DashboardService,
        public dialogRef: MatDialogRef<DialogModalComponent>,
        @Inject(MAT_DIALOG_DATA) public ad: Ad) {
       this.filteredTags = this.dashboardService.getCategories();
        this.dashboardService.getCategories().subscribe(
          (cat) => {
            this.categories = cat;
            if (this.categories) {
              console.warn(this.categories);
              const tas = this.categories;
              tas.forEach((element) => {
                const tag = element.tags.split(',');
                if (tag.length > 1){
                  tag.forEach((elem) => {
                    const tagElement = elem.trim();
                    if (tagElement.length > 0) {
                      this.tags.push(tagElement);
                    }
                  });
                }
              });
           }
          }, (error) => {
            console.log(error);
          }
        );
      this.filteredContactEmail = this.contactEmailCtrl.valueChanges.pipe(
        startWith(null),
        map((email: string | null) => email ? this._filter(email) : this.emailList.slice()));
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
        if (this.ad.tags.length !== 0 ) {
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
          case 'ad' :
            if (action === 'add' || action === 'update'){
              this.globalForm = this.fb.group({
                  title: [this.ad.title, Validators.required],
                  comment: [this.ad.comment],
                  amount: [this.ad.amount],
                  published: [this.ad.published],
                  show_amount: [this.ad.show_amount],
                  tags : [this.ad.tags],
                  user_id : [this.ad.user_id],
                  assets : [this.ad.assets],
                  contacts : [this.ad.contacts],
                  description : [this.ad.description],
                  street : [this.ad.street],
                  zipcode : [this.ad.zipcode],
                  city : [this.ad.city],
                  country : [this.ad.country],
                  rooms : [this.ad.rooms],
                  bathroom : [this.ad.bathroom],
                  handicap_accessibility : [this.ad.handicap_accessibility],
                  sold : [this.ad.sold],
                  /*documents: this.fb.array([
                      this.fb.control('')
                  ]),*/
              });
              this.contactForm = this.fb.group({
                name: new FormControl(''),
                emails: new FormArray([], CustomValidator.validateEmails)
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
        this.ad = Object.assign(this.ad, this.globalForm.value);
        const key = Object.keys(this.ad);
        console.warn(key);
        key.forEach((elem) => {
              this.ad[elem] = null ?? '';
        });
        this.ad.tags = 'test';
        this.ad.published = null || '' ? false : true;
        const data = new FormData();
        data.append('ad', JSON.stringify(this.ad));
        if (this.files.length > 0) {
          for (const file of this.files){
            data.append(`file_${file.idFile}`, file.fileUpload );
          }
        }
        if (this.emailsSelected.length > 0) {

        }
        this.dashboardService.updateAd(data).subscribe(
          (result) => {
            this.onNoClick({ success: 'L\'annonce a été mise à jour'});
          }
        );

        // this.ad.tags = this.tagAdCurrent.join(',');
        // this.ad.user_id = 1; // TODO USERID !!!!!

    }


    onGroupEmailChange(options: MatListOption[]) {
      console.log(options.map(o => o.value));
      this.emailsSelected = options.map(o => o.value);
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

    if ((value || '').trim() ) {
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
    if ((value.trim() !== '')) {
      this.emails.push(value);
      this.contactEmailCtrl.setValue(null);
      // this.globalForm.controls['contact'].markAsDirty();
      input.value = '';
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newMail = new Contact();
    newMail.email = event.option.viewValue;
    this.emails.push(newMail);
    // this.fruitInput.nativeElement.value = '';
    this.contactEmailCtrl.setValue(null);
  }

  remove(tag: string, isEmail?: boolean): void {
    if (isEmail) {
      const index = this.emails.findIndex(x => x.email.toLowerCase().trim() === tag.toLowerCase().trim());
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

    return this.emailList.filter(emailTable => emailTable.email.toLowerCase().indexOf(filterValue) === 0);
  }


  onUploadFile(event): void {
    console.log(event.target.files);
    const filesU = event.target.files;
    if (filesU.length === 1) {
      const file = event.target.files[0];
      if (file.name.trim() !== '') {
        const nbFile = this.files.length;
        this.files = [...this.files, {
          idFile: nbFile, fileUpload: file
        }];
      }
    } else if (filesU.length > 1) {
      for (let i = 0; i < filesU.length ; i++) {
        const nbFiles = this.files.length;
        this.files = [...this.files, {
          idFile: nbFiles, fileUpload: filesU[i]
        }];
      }
    }
  }

  onDeleteFile(file: any): void {
    this.files = this.files.filter((fileSelected) => {
      return file.idFile !== fileSelected.idFile;
    });
  }
}
