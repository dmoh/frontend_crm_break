import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  newContact:boolean;
  @Input() public detail: boolean;
  @ViewChild('fileinput', { static: true }) inputRef: ElementRef;
  contactFormu: FormGroup;
  @Input() public opened: boolean;
  url: string;
  //contacts: Contact[];
  contactSub: Subscription;
  //contact: Contact;
  //contacts: Contact[];
  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
    public dialogRef: MatDialogRef<ContactFormComponent>,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');
      console.log("index", index)
      if (index !== null) {
        this.contact = this.contactService.getContact(index);
        console.log('contact', this.contact)
      }
      this.initForm(this.contact);


    })
  }
  initForm(
    contact: Contact = { id: null, typeClient:'', categoryClient:'', kind:'', name: '', lastName: '', country:'', city:'', adress: '', phone_number: "", email: '', budget: null, geographicSector:'', buildings:'', buildingRegime:'', yield:null, comments:''}
    ) {
    this.contactFormu = this.formBuilder.group({
      //description: this.formBuilder.group({
      id: [contact.id],
      typeClient: [contact.typeClient],
      categoryClient: [contact.categoryClient],
      kind: [contact.kind],
      name: [contact.name],
      lastName: [contact.lastName],
      country: [contact.country],
      city: [contact.city],
      adress: [contact.adress],
      phone_number: [contact.phone_number],
      email: [contact.email],
      budget: [contact.budget],
      geographicSector: [contact.geographicSector],
      buildings: [contact.buildings],
      buildingRegime: [contact.buildingRegime],
      yield: [contact.yield],
      comments: [contact.comments]
    })

  }
  onSubmit(): void {
    const newContact = this.contactFormu.value;
     this.contactService.addContact(newContact);
      console.log('contact', newContact);
      this.dialogRef.close(newContact);
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
