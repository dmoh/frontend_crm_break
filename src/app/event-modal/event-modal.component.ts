import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateSelectArg} from "@fullcalendar/angular";
import {crmConstants} from "@app/_helpers/crm-constants";

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {

  eventSelected: any;
  eventForm: FormGroup;
  crmConstants = crmConstants;
  dateEvent = { start: null, end: null };
  event = null;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<any>
  ) {
    this.eventSelected = this.data.event;
    this.dateEvent.start = new Date(this.eventSelected.start).toLocaleString();
    this.dateEvent.end = new Date(this.eventSelected.end).toLocaleString();
    this.event = {
      id: this.eventSelected.id,
      start: this.eventSelected.startStr,
      end: this.eventSelected.endStr,
      title: this.eventSelected.title,
      allDay: this.eventSelected.allDay,
      color: !this.eventSelected.color ? crmConstants.CODE_COLOR_EVENT_DEFAULT : this.eventSelected.color,
      eventId: 0
    };
    if (
      this.eventSelected.extendedProps
      && this.eventSelected.extendedProps.eventId
      && this.eventSelected.extendedProps.eventId > 0
    ) {
      this.event.eventId = this.eventSelected.extendedProps.eventId
    }
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      'message': [this.event.title, Validators.required],
      'color': [this.event.color, Validators.required]
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }
    this.event = Object.assign(this.event, this.eventForm.value);
    this.dialogRef.close(this.event);
  }

}
