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
      id: 1,
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
      name: "Alissa",
      lastName: 'Neslson',
      adress: '390 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'alissaharding@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 3,
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
      name: "Bernard",
      lastName: 'Langley',
      adress: '380 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'bernardg@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 5,
      name: "Candice",
      lastName: 'Munoz',
      adress: '389 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'candice@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
    {
      id: 6,
      name: "Catryn",
      lastName: 'Snider',
      adress: '400 Holt Court, Thomasville, Alaska, PO2867',
      phone_number: "000 000 000",
      email:'sniderg@mail.us',
      fonction: "prospect",
      description: "Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam ",
    },
  ])
  constructor() { }
}
