export class User {
  id: number = 0;
  username: string;
  email: string = '';
  password?: string = '';
  role: any[] = [];
  token?: string|number;
  position?: number = 0;
  isAdmin = false;
  isSuperAdmin = false;
  isEmployee = false;
  isCustomer = false;
}

export const ELEMENT_DATA: User[] = [
  /*{id: 1, username: 'Hydrogen', token: 1.0079, email: 'H'},
  {id: 2, username: 'Helium', token: 4.0026, email: 'He'},
  {id: 3, username: 'Lithium', token: 6.941, email: 'Li'},
  {id: 4, username: 'Beryllium', token: 9.0122, email: 'Be'},
  {id: 5, username: 'Boron', token: 10.811, email: 'B'},
  {id: 6, username: 'Carbon', token: 12.0107, email: 'C'},
  {id: 7, username: 'Nitrogen', token: 14.0067, email: 'N'},
  {id: 8, username: 'Oxygen', token: 15.9994, email: 'O'},
  {id: 9, username: 'Fluorine', token: 18.9984, email: 'F'},
  {id: 10, username: 'Neon', token: 20.1797, email: 'Ne'},
  {id: 11, username: 'Sodium', token: 22.9897, email: 'Na'},
  {id: 12, username: 'Magnesium', token: 24.305, email: 'Mg'},
  {id: 13, username: 'Aluminum', token: 26.9815, email: 'Al'},
  {id: 14, username: 'Silicon', token: 28.0855, email: 'Si'},
  {id: 15, username: 'Phosphorus', token: 30.9738, email: 'P'},
  {id: 16, username: 'Sulfur', token: 32.065, email: 'S'},
  {id: 17, username: 'Chlorine', token: 35.453, email: 'Cl'},
  {id: 18, username: 'Argon', token: 39.948, email: 'Ar'},
  {id: 19, username: 'Potassium', token: 39.0983, email: 'K'},
  {id: 20, username: 'Calcium', token: 40.078, email: 'Ca'},*/
];
