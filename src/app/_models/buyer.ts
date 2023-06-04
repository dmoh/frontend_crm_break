import {Address} from "@app/_models/address";
import {AgentBuyer} from "@app/_models/agent-buyer";

export class Buyer {
   id = 0;
   name = null;
   idRef = null;
   createdAt = null;
   email = null;
   phoneNumber = null;
   comment = null;
   customerType = null;
   budgetMin = null;
   budgetMax = null;
   properties = null;
   messageMail = null;
   address = new Address();
   country = null;
   city = null;
   street = null;
   zipcode = null;
   currency = null;
   tags = null;
   areasDesired = null;
   typeProperty = null;
   propertyRegime = null;
   employeeInCharge = null;
   agentsBuyer: AgentBuyer[] = [];
   isSelectedToRemove = false;
   hasBuildingLease = false; // droit de superficie
   amountOffer = 0
}

