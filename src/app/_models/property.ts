import {Address} from "@app/_models/address";

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
  updateAt = null;
}
