export class Contact {
  id?: number;
  //letter: string;
  typeClient?: string;
  categoryClient?: string;
  kind?: string;
  name: string = '';
  lastName?: string = '';
  country?: string = '';
  city?: string = '';
  zipcode?: string = '';
  //street?: string = '';
  adress: string = '';
  phone_number: string;
  email: string;
  //budget?: {min, max} = {min: 0, max: 0};
  budget: number;
  geographicSector?: string;
  buildings?: string;
  buildingRegime?: string;
  yield?: number;
  comments?: string;
  criteriasBind?: string = '';
}

  //description: string = '';
  //enabled: boolean = true;
  //additional_information: string = '';
  //tags?: string = '';
