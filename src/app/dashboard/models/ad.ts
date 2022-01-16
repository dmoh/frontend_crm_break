import {Contact} from './contact';

export class Ad {
  id: number;
  title: string;
  type?: string;
  contact?: Contact;
  buildingRegime?: string;
  sellingPrice?: number;
  rentalStatus?: number;
  yield?: number;
  comment: string = '';
  country?: string = '';
  city?: string = '';
  zipcode?: string = '';
  street?: string = '';

  published?: boolean = true;
  date_publication?: string;

  //tags?: string = '';
  //user_id: number = 0; // TODO CHECK USERID
  assets?: string = '';
  show_amount?: boolean = false;
  description?: string = '';
  area?: number;
  rooms?: number = 0;
  bedrooms?: number = 0;
  bathroom?: number = 0;
  wc?: number = 0;
  handicap_accessibility?: boolean = false;
  //location?: string = '';
  equipment?: string = '';
  sold?: boolean;
  image?: string = '';
//contacts?: Contact[] = [new Contact()];
}

