import {Contact} from './contact';

export class Ad {
    id: number = 0;
    title: string = '';
    amount: number = 0;
    published: boolean = true;
    date_publication: string;
    comment: string = '';
    tags: string = '';
    user_id: number = 0; // TODO CHECK USERID
    assets: string = '';
    contacts?: Contact[] = [new Contact()];
    show_amount?: boolean = false;
    description?: string = '';
    street?: string = '';
    zipcode?: string = '';
    city?: string = '';
    country?: string = '';
    rooms?: number = 0;
    bathroom?: number = 0;
    handicap_accessibility?: boolean = false;
    sold?: boolean;
}
