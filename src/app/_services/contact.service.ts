import { Injectable } from '@angular/core';
import { Contact } from '@app/dashboard/models/contact';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];
  public contact$: BehaviorSubject<Contact[]> = new BehaviorSubject([
    {
      id: 6,
      //letter: "",
      name: "Catryn",
      lastName: 'Snider',
      adress: '400 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'sniderg@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 1,
      //letter: "",
      name: "Alice",
      lastName: 'Harding',
      adress: '387 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'aliceharding@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 2,
      //letter: "",
      name: "Alissa",
      lastName: 'Neslson',
      adress: '390 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'alissaharding@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 5,
    //  letter: "",
      name: "Candice",
      lastName: 'Munoz',
      adress: '389 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'candice@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 3,
      //letter: "",
      name: "Barber",
      lastName: 'Jonhson',
      adress: '395 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'barberaharding@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 4,
     // letter: "",
      name: "Bernard",
      lastName: 'Langley',
      adress: '380 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'bernardg@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 7,
     // letter: "",
      name: "David",
      lastName: 'Langley',
      adress: '580 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'david@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 8,
     // letter: "",
      name: "Damien",
      lastName: 'Langley',
      adress: '480 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'damien@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
  ])
  constructor() { }

  getContact(index: string) {
    const contacts = this.contact$.value;
    return contacts[index];
  }

}
