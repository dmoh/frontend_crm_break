import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Ad} from "../dashboard/models/ad";
import {DashboardService} from "../dashboard/dashboard.service";


@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {

    globalForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private dashboardService: DashboardService,
        public dialogRef: MatDialogRef<DialogModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ad) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
      this.createForm('ad', 'add');
    }


    createForm(formType: string, action: string): void {
      switch (formType) {
          case 'ad' :
            if(action == 'add'){
              this.globalForm = this.fb.group({
                  title: [this.data.title, Validators.required],
                  comment: [this.data.comment],
                  amount: [this.data.amount],
                  /*documents: this.fb.array([
                      this.fb.control('')
                  ]),*/
                  tags: [this.data.tags]
              });
            }
            break

      }
    }

    get documents() {
        return this.globalForm.get('documents') as FormArray;
    }

    get tags() {
      return this.globalForm.get('tags') as FormArray;
    }


    onSubmit(): void {
        this.data = Object.assign(this.data, this.globalForm.value);
        this.data.user_id = 1; //TODO USERID !!!!!

        this.dashboardService.updateAd(this.data).subscribe(
            (result) => {
                console.warn(result);
            }
        )
    }


    add(choice: string) {
        if(choice === 'tag'){
            this.tags.push(this.fb.control(''));
        } else {
            this.documents.push(this.fb.control(''));
        }
    }
}