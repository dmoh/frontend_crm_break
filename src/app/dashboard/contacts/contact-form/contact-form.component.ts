import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contacts: Contact[];
  contact: Contact;
  constructor(private contactService: ContactService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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
