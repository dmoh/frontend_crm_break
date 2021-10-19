import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  contact: Contact;
  //contacts: Contact[];

  constructor(private contactService: ContactService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

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
    contact: Contact = { id: null, name: '', lastName: '', adress: '', phone_number: "", email: '', fonction: '', description: '' }
    ) {
    this.contactForm = this.formBuilder.group({
      //description: this.formBuilder.group({

      id       : [contact.id],
      name     : [contact.name],
      lastName   : [contact.lastName],
      adress    : [contact.adress],
      phone_number: [contact.phone_number],
      email:      [contact.email],
      fonction: [contact.fonction],
      description: [contact.description],

      //priority: [todo.priority.name],
    })
  }
}
