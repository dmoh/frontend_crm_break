import {Contact} from './contact';

export class Ad {
    id: number = 0;
    title: string = '';
    type?: string = '';
    category: string;
    comment: string = '';
    amount: number = 0;
    published: boolean = true;
    date_publication: string;

    tags: string = '';
    user_id: number = 0; // TODO CHECK USERID
    assets: string = '';
    show_amount?: boolean = false;
    description?: string = '';

    country?: string = '';
    city?: string = '';
    zipcode?: string = '';
    street?: string = '';

    area?: number;
    rooms?: number = 0;
    bedrooms?: number = 0;
    bathroom?: number = 0;
    wc?: number = 0;
    handicap_accessibility?: boolean = false;
    //location?: string = '';
    equipment?: string = '';
    sold?: boolean;

    image: string = '';
    contacts?: Contact[] = [];

    //contacts?: Contact[] = [new Contact()];

}
