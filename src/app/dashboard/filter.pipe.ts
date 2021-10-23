import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './models/contact';
//import { ContactsComponent } from './contacts/contacts.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Contact[], search:string): Contact[] {
    return value.filter((v)=> v.name.toLocaleLowerCase().includes(search));
  }

}
