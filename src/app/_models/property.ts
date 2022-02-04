import {Address} from "@app/_models/address";
import {Buyer} from "@app/_models/buyer";

export class Property {
  id = 0;
  labelBuilding = null;
  typeProperty = null;
  labelTypeProperty = null;
  propertyRegime = null;
  sellingPrice = null;
  currency = null;
  rentalStatus = null;
  yield = null;
  comment = null;
  address = new Address();
  owner = new Buyer();
  updateAt = null;
  ownerName = null;
  propertyUnsortedId = null;
  canton = null;
  isSociety = null;
}
