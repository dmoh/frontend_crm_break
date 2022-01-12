import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template-mail',
  templateUrl: './template-mail.component.html',
  styleUrls: ['./template-mail.component.scss']
})
export class TemplateMailComponent implements OnInit {

  emailForm: FormGroup;
  content = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil consequuntur eaque quae exercitationem fuga molestias omnis odit iste vitae, perferendis voluptates vel laudantium reprehenderit. Quo suscipit officiis aliquam excepturi!';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.emailForm = this.fb.group({
      name: [""],
      lastName: [""],
      email: [""],
      content: [this.content],

    })
  }

}
