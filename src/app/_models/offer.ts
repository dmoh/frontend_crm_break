import {Buyer} from "@app/_models/buyer";
import {Property} from "@app/_models/property";
import {crmConstants} from "@app/_helpers/crm-constants";
import {Sale} from "@app/_models/sale";

export class Offer {
  id = 0;
  title = null;
  createdAt = null;
  updatedAt = null;
  property = new Property();
  potentialBuyers: Buyer[] = [];
  sellingPropositionPrice: number = 0;
  status: number = crmConstants.CODE_OFFER_STATUS_INIT.value;
  commission = null;
  sendMailBuyers = false;
  sale = new Sale();
  collaborator = null;
}
