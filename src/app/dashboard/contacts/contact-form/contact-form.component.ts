import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() public newContact:boolean;
  @Input() public detail: boolean;
  @Input() public contacts:Contact[];
  contactForm: FormGroup;
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
      }
      this.initForm(this.contact);
    })
  }
  initForm(
    contact: Contact = { id: null, typeClient:'', categoryClient:'', kind:'',  name: '', lastName: '', country:'', city:'', adress: '', phone_number: "", email: '', budget: null, geographicSector:'', buildings:'', buildingRegime:'', yield:null, comments:''}
    ) {
    this.contactForm = this.formBuilder.group({
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
    const newContact = this.contactForm.value;
     this.contactService.addContact(newContact);
     console.log('contact', newContact)
     this.dialogRef.close(newContact)
  }
}
