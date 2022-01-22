import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MailOfferBuyer} from "@app/_models/mail-offer-buyer";

@Component({
  selector: 'app-template-mail',
  templateUrl: './template-mail.component.html',
  styleUrls: ['./template-mail.component.scss']
})
export class TemplateMailComponent implements OnInit {

  mailForm: FormGroup;
  mailOfferBuyer = new MailOfferBuyer();
  messageMail = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {

    if (this.data.buyer) {
      this.mailOfferBuyer.buyer =
        Object.assign(
          this.mailOfferBuyer.buyer,
          this.data.buyer
        )
      if (!this.mailOfferBuyer.buyer.messageMail) {
        this.mailOfferBuyer.buyer.messageMail = this.messageMail;
      }
    }

    this.mailForm = this.fb.group({
      name: [""],
      lastName: [""],
      email: [""],
      content: [this.mailOfferBuyer.buyer.messageMail]
    });

  }

  onValidate() {
    const msg = this.mailForm.get('content')
      .value;
    if (msg !== this.messageMail) {
      this.mailOfferBuyer.message = msg;
      this.mailOfferBuyer.buyer.messageMail = msg;
      this.dialogRef.close(this.mailOfferBuyer);
    } else {
      this.dialogRef.close(false);
    }

  }
}
