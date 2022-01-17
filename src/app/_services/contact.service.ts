import { Injectable } from '@angular/core';
import { Ad } from '@app/dashboard/models/ad';
import { Contact } from '@app/dashboard/models/contact';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];


  public contact$: BehaviorSubject<any[]> = new BehaviorSubject([
    {
      id: 1,
      //letter: "",
      name: "Catryn",
      lastName: 'Snider',
      adress: '400 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'sniderg@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 100000,
      yield: 5,
      country:'france',
      city: "paris",
      type: "logements",
    },
    {
      id: 2,
      //letter: "",
      name: "Alice",
      lastName: 'Harding',
      adress: '387 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'aliceharding@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 200000,
      yield: 7,
      country:'france',
      city: "toulouse",
      type: "logements",
    },
    {
      id: 3,
      //letter: "",
      name: "Alissa",
      lastName: 'Neslson',
      adress: '390 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'alissaharding@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 400000,
      yield: 8,
      country:'france',
      city: "marseille",
      type: "bureaux",
    },
    {
      id: 4,
      //  letter: "",
      name: "Candice",
      lastName: 'Munoz',
      adress: '389 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'candice@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 600000,
      yield: 10,
      country:'france',
      city: "nice",
      type: "logements",
    },
    {
      id: 5,
      //letter: "",
      name: "Barber",
      lastName: 'Jonhson',
      adress: '395 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'barberaharding@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 700000,
      yield: 5,
      country:'france',
      city: "strasbourg",
      type: "logements",
    },
    {
      id: 6,
      // letter: "",
      name: "Bernard",
      lastName: 'Langley',
      adress: '380 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'bernardg@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 300000,
      yield: 8,
      country:'france',
      city: "monaco",
      type: "logements",
    },
    {
      id: 7,
      // letter: "",
      name: "David",
      lastName: 'Langley',
      adress: '580 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'david@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 200000,
      yield: 5,
      country:'france',
      city: "paris",
      type: "logements",
    },
    {
      id: 8,
      // letter: "",
      name: "Damien",
      lastName: 'Langley',
      adress: '480 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email: 'damien@mail.us',
      comments: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
      budget: 400000,
      yield: 5,
      country:'france',
      city: "paris",
      type:"logements",
    },
  ])
  constructor(private http: HttpClient) { }

  getContact(index: string) {
    const contacts = this.contact$.value;
    return contacts[index];
  }
  addContact(contact: Contact) {
      const value = this.contact$.value;
      this.contact$.next([...value, contact])
  }
  contactSort(ad: Ad) {
    const value = this.contact$.value;
    this.contact$.next(
      value.filter((contact) => {
        if (ad.sellingPrice <= contact.budget || contact.budget == ad.sellingPrice) {
          return contact.email;
          //console.log(contact.email);
        } else {
          return null;
        }
      })
    )
  }


  updateContact() {
    return
  }
}
