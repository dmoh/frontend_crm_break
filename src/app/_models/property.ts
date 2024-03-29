import {Address} from "@app/_models/address";
import {Owner} from "@app/_models/owner";

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
  owner = new Owner();
  owners = null;
  updateAt = null;
  ownerName: string = null;
  propertyUnsortedId = null;
  canton = null;
  city = null;
  zipcode = null;
  street = null;
  isSociety = null;
  phoneNumber = null;
  email = null;
  ownerIsBuyer = false;
  hasRentalStatus = null;
  hasDetailedManagementAccount = null;
  hasExtractLandRegister = null;
  hasBuildingInsurance = null;
  hasPhotos = null;
  hasBuildingPlans = null;
  hasListOfWorks = null;
  hasBuildingLease = false;
}
