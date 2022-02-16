import { Pipe, PipeTransform } from '@angular/core';
import {Buyer} from "@app/_models/buyer";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Buyer[], search:string): Buyer[] {
    return value.filter((v) => v && v.name && v.name.trim() && v.name.toLocaleLowerCase().includes(search.toLowerCase()));
  }

}
