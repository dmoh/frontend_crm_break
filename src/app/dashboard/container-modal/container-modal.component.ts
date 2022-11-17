import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {crmConstants} from "@app/_helpers/crm-constants";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProspectService} from "@app/_services/prospect.service";
import {CommentProspect} from "@app/_models/comment-prospect";
import {ReminderService} from "@app/_services/reminder.service";

@Component({
  selector: 'app-container-modal',
  templateUrl: './container-modal.component.html',
  styleUrls: ['./container-modal.component.scss']
})
export class ContainerModalComponent implements OnInit {
  statusSelected = null;
  property = null;
  crmConstants = crmConstants;
  observationControl = new FormControl();
  remindersForm = new FormArray([]);
  showSaveBtn = false;
  showReminderOnly = false;

  constructor(
    private prospectService: ProspectService,
    private reminderService: ReminderService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data?.showReminderOnly) {
      this.showReminderOnly = this.data?.showReminderOnly;
    }
    if(!this.showReminderOnly) {
      if (this.data && this.data.statusSelected) {
        this.statusSelected =  this.data.statusSelected;
      }

      if (this.data && this.data.property) {
        this.property =  this.data.property;
      }
    }
  }

  onSave() {
    let reminders = this.remindersForm.value;
    if (this.showReminderOnly) {
      this.reminderService
        .updateReminder(reminders)
        .subscribe((res) => {
          if (res.ok) {
            this.dialogRef.close(true);
          }
        });
      return;
    }
    const obs = this.observationControl.value;
    let commentProspect = null;
    if (obs && obs.trim().length > 1) {
      // save new comment for this property
      commentProspect = new CommentProspect();
      commentProspect.comment = obs;
    }
    this.prospectService
      .updateStatusProspect({
        comment: commentProspect,
        status: this.statusSelected,
        property: this.property,
        reminders: reminders.length > 0 ? reminders : null
      })
      .subscribe((response: any) => {
        if (response.ok && response.comment) {
          this.property.comment = response.comment;
          this.property.status = this.statusSelected;
          this.dialogRef.close(this.property);
        }
      });
  }

  removeReminder(index: number) {
    this.remindersForm.removeAt(index);
  }

  addReminder() {
    this.showSaveBtn = true;
    const group = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      remindAt: new FormControl('')
    });
    this.remindersForm.push(group);
  }
}
