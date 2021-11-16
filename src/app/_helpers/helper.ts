import { ArrayType } from "@angular/compiler";
import { Ad } from "@app/dashboard/models/ad";
import { Contact } from "@app/dashboard/models/contact";
import { element } from "protractor";
import { criterias } from "./helper-constants";

export class Helper {

  static sortTableCriterias(contacts: Contact[], datasToCompare: Ad) {
    let response = [];

    contacts.forEach(contact => {
      if (contact.budget && datasToCompare.sellingPrice) {
        if (+contact.budget >= datasToCompare.sellingPrice) {

          if (response.length > 0) {
            const indexFind = response.findIndex(contactResponse => +contactResponse.id === contact.id);
            if (indexFind === -1) {
              response = [...response, contact];
            }
          } else {
            response = [contact];

          }
          if (contact.criteriasBind && contact.criteriasBind.trim().length > 2) {
            if (!/budget/i.test(contact.criteriasBind)) {
                contact.criteriasBind += `${criterias.BUDGET},`;
            }
          } else {
            contact.criteriasBind = `${criterias.BUDGET},`;
          }
          //response = [...response, contact];
        }
      }
      if (contact.yield && datasToCompare.yield) {
        if (+contact.yield >= datasToCompare.yield) {

          if (response.length > 0) {
            const indexFind = response.findIndex(contactResponse => +contactResponse.id === contact.id);
            if (indexFind === -1) {
              response = [...response, contact];
            }
          } else {
            response = [contact];
          }
          //response = [...response, contact];
          if (contact.criteriasBind && contact.criteriasBind.trim().length > 2) {
            if (!/yield/i.test(contact.criteriasBind)) {
              contact.criteriasBind += `${criterias.YIELD},`;
          }

          } else {
             contact.criteriasBind = `${criterias.YIELD},`;
         }
        }
      }
    });
    return response;
  }
}
