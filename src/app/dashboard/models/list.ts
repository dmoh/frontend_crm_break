import { Item } from "./item";

export interface List {
  label: string;
  totalAmount: number;
  totalOffer: number;
  items: Item[];
}
