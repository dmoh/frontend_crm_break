import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from '@app/dashboard/models/contact';
import { ContactService } from '@app/_services/contact.service';
import {Subject, Subscription} from 'rxjs';
import {Buyer} from "@app/_models/buyer";
import {PropertyService} from "@app/_services/property.service";
import {BuyerService} from "@app/_services/buyer.service";
import {Address} from "@app/_models/address";
import {MatDrawer} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSelectChange} from "@angular/material/select";
import {AgentBuyer} from "@app/_models/agent-buyer";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() public detail: boolean;
  @ViewChild('fileinput', { static: true }) inputRef: ElementRef;
  @Input() public opened: boolean;
  @Output() closeSidenav = new EventEmitter<boolean>();
  url: string;
  buyerForm: FormGroup;
  buyer: Buyer = new Buyer();
  address = new Address();
  cantons: any[] = [];
  contactSub: Subscription;
  sideDrawer: MatDrawer;
  agentsBuyer = new FormArray([]);
  crmConstants = crmConstants;
  showAddAgentButton = false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public contact: Contact,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');

      this.propertyService
        .getCantonList()
        .subscribe((response) => {
          this.cantons = response.cantons;
        });

      this.buyerService.buyerCurrent.subscribe((buyer) => {
        this.agentsBuyer = new FormArray([]);

        this.buyer = buyer;
        this.initForm(this.buyer);
      });

    })
  }
  initForm(buyer) {
    this.buyerForm = this.formBuilder.group({
      id: [buyer.id],
      name: [buyer.name],
      email: [buyer.email],
      comment: [buyer.comment],
      budgetMin: [buyer.budgetMin],
      budgetMax: [buyer.budgetMax],
      typeProperty: [buyer.typeProperty],
      areasDesired: [buyer.areasDesired],
      tags: [buyer.tags],
      phoneNumber: [buyer.phoneNumber],
      customerType: [buyer.customerType],
      propertyRegime: [buyer.propertyRegime]
    })

    if (buyer.areasDesired && buyer.areasDesired.length > 0) {
      const arr = buyer.areasDesired.split(',');
      this.buyerForm.get('areasDesired')
        .patchValue(arr);

    }
    if (buyer.typeProperty && buyer.typeProperty.length > 0) {
      const arr = buyer.typeProperty.split(',');
      const arrInt = arr.map((e) => +e);
      this.buyerForm.get('typeProperty')
        .patchValue(arrInt);
    }

    if (buyer.propertyRegime && buyer.propertyRegime.length > 0) {
      const arr = buyer.propertyRegime.split(',');
      const arrInt = arr.map((e) => +e);
      this.buyerForm.get('propertyRegime')
        .patchValue(arrInt);
    }


    if (buyer.customerType === crmConstants.CUSTOMER_TYPE_INSTITUTIONAL) {
      this.showAddAgentButton = true;
    }


  }
  onSubmit(): void {
    this.buyer = Object.assign(this.buyer, this.buyerForm.value);
    let buyerCurrent = Object.assign(new Buyer(), this.buyer);
    if (this.agentsBuyer && this.agentsBuyer.value && this.agentsBuyer.value.length > 0) {
      const agents = this.agentsBuyer.value;
      agents.forEach((elem) => {
        if (
          !elem.lastname
          && !elem.firstname
          && !elem.email
          && !elem.phoneNumber
        ) {} else {
          const agent = Object.assign(new AgentBuyer(), elem);
          buyerCurrent.agentsBuyer = [...buyerCurrent.agentsBuyer, agent];
        }
      });
    }
    this.buyerService
      .updateBuyer(buyerCurrent)
      .subscribe((res) => {
        if (res.ok) {
          this.snackBar.open('Mise à jour avec succés', 'ok', {
            duration: 4500
          });
          buyerCurrent = res.buyer;
          this.buyer = res.buyer;
          this.buyerService
            .setBuyerCurrent(this.buyer);
          this.buyerService
            .setStateDrawer(false);
        }
      });
  }
  onSelectFile(e) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  openFile() {
    this.inputRef.nativeElement.click()
  }

  removeAgentBuyer(index: number) {
    this.agentsBuyer.removeAt(index);
  }

  onAddAgentBuyer() {
    const group = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null),
    });
    this.agentsBuyer.push(group);
  }

  onChangeCustomerType(event: MatSelectChange) {
    if (event.value === crmConstants.CUSTOMER_TYPE_INSTITUTIONAL) {
      this.showAddAgentButton = true;
    } else {
      this.showAddAgentButton = false;
    }
  }

  onRemoveAgent(agent: any) {
     if(agent.id && +agent.id > 0) {
       this.buyerService
         .removeAgentBuyer(agent, this.buyer)
         .subscribe((res) => {
           if (res.ok) {
             this.snackBar.open('Représentant supprimé', 'ok', {
               duration: 2000
             });
             this.buyer.agentsBuyer = this.buyer.agentsBuyer.filter((elem) => +elem.id !== +agent.id)
           }
         });
     }
  }


}
