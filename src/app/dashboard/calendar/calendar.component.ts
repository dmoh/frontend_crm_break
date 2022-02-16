import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Task } from '@app/tasks/task';
import { TaskService } from '@app/_services/task.service';
//import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  FullCalendarComponent,
  Calendar, EventInput
} from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { INITIAL_EVENTS, createEventId } from './event.utils';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {EventService} from "@app/_services/event.service";
import {Event} from "@app/_models/event";
import {Helper} from "@app/_helpers/helper";
import {MatDialog} from "@angular/material/dialog";
import {EventModalComponent} from "@app/event-modal/event-modal.component";
import {crmConstants} from "@app/_helpers/crm-constants";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  tasks: Task[]=[];
  tasksSubscription: Subscription;
  calendarVisible = false;
  workVisible = false;
  selectInfo = null;
  events: EventInput[] = [];
  @ViewChild('fullcalendarT') calendarFull: FullCalendarComponent;
  @ViewChild('confirmSwal')
  public readonly confirmSwal!: SwalComponent;
  calendarApi = null;
  crmConstants = crmConstants;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      right: 'timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    lazyFetching: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locales: [frLocale],
    locale: 'fr',
    dateClick: this.handleDateClick.bind(this),
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDrop: this.handleDrop.bind(this)
    //eventSources:[]
    // eventColor: '#ccc'

    // you can update a remote database when these fire:
    // eventAdd: ((val) => { console.warn('val', val)})
    /*eventChange:
    eventRemove:*/

  };
  optionsPriority = {
    high: 'Importante',
    medium: 'normal'
  };

  currentEvents: EventApi[] = [];

  constructor(
    private taskService: TaskService,
    private eventService: EventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  private getEventList() {
    this.eventService
      .getEventList()
      .subscribe((response) => {
        this.events = response.events.map((ev) => ({
            id: createEventId(),
            title: ev.title,
            start: Helper.formatTimestampToDateTimeStr(ev.start),
            end: Helper.formatTimestampToDateTimeStr(ev.end),
            allDay: false,
            color: ev.color,
            extendedProps: {
              eventId: ev.id
            }
        }));
        this.events = [...this.events, {
          id: createEventId(),
          title: this.events[0].title,
          start: this.events[0].start,
          end: this.events[0].end,
          allDay: false,
          color: 'green'
        }
        ];
        this.calendarOptions.events = this.events;
        console.warn('dff', this.events);
        this.calendarVisible = true;
      });
  }

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.task$.subscribe(
      (tasksRecup: Task[]) => {
        this.tasks = tasksRecup;
        console.log('taskRecup dans le calendrier', this.tasks)
      }
    );

    // this.calendarOptions.events =
    //this.taskService.emitTodo();
  }

  ngAfterViewInit() {
    this.getEventList();
  }

  handleDateClick(event) {
    console.warn('date ', event)
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }
  /*handleWorkToggle() {
    this.workVisible = !this.workVisible;
    console.log('work', this.workVisible)
    //console.log('work', this.tasks)
    let allTask ;
      switch (allTask) {
        case 'work':
          //console.log('Oranges are $0.59 a pound.');
          break;
        case 'personal':
          //console.log('Oranges are $0.59 a pound.');
        case 'appointment':
          //console.log('Mangoes and papayas are $2.79 a pound.');

          break;
        default:
          //console.log(`Sorry, we are out of ${expr}.`);
      }

  }*/

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectInfo = selectInfo;

    console.warn('selectInfo', this.selectInfo);

    let eventNew = new Event();
    eventNew.allDay = selectInfo.allDay;
    eventNew.endAt = selectInfo.endStr;
    eventNew.end = selectInfo.end;
    eventNew.startAt = selectInfo.startStr;
    eventNew.start = selectInfo.start;
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {
        event: eventNew
      }
    });

    dialogRef.afterClosed()
      .subscribe((res) => {
        if (res && res.message) {
          // calendarApi.unselect(); // clear date selection
          eventNew.title = res.message;
          if (crmConstants.CODE_COLOR_EVENT_DEFAULT !== res.color) {
            eventNew.color = res.color;
          }

          /*this.eventService
            .getEventList()
            .subscribe((response) => {
              this.calendarOptions.events = response;
            });*/

          this.calendarApi = selectInfo.view.calendar;
          this.updateEvent(eventNew);
        }

      });
    return;

    //this.confirmSwal.fire();
    /*const title = '';
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();*/ // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    const eventId = clickInfo.event.extendedProps?.eventId;
    if(eventId && +eventId > 0) {
      const dialogRef = this.dialog.open(EventModalComponent, {
        data: {
          event: clickInfo.event
        }
      });

      dialogRef
        .afterClosed()
        .subscribe((res) => {
          if (res.event && res.remove) {
            const eventSelected = res.event;
            this.eventService
              .removeEvent(res.event)
              .subscribe((res) => {
                if (res.ok) {
                  this.snackBar
                    .open('L\'évènement a bien été supprimé', 'ok', {
                      duration: 4000
                    });
                  clickInfo.event.remove();
                }
              })
          } else {
            let eventUpdated = res;
            console.warn(res);
            eventUpdated.eventId = eventId;
            this.updateEvent(eventUpdated);
          }

      });
    }

  }





  handleEvents(events: EventApi[]) {
    return;
    this.currentEvents = events;
    console.warn('handleEvent', events);

    console.log('currentEvent', this.currentEvents)
  }


  handleDrop(dropEvent: any) {
    const event = dropEvent.event;
    this.calendarApi = dropEvent.view.calendarApi;
    console.warn(event.id);
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {
        event: dropEvent.event
      }
    });

    dialogRef
      .afterClosed()
      .subscribe((res) => {
        if (res && res.title) {
          this.updateEvent(res);
        }
      }
    )
  }


  updateEvent(event) {
    this.eventService
      .updateEvent(event)
      .subscribe((response) => {
        if (response.ok) {
          if (event.eventId && +event.eventId === 0) {
            const title = event.title;
            this.calendarApi.addEvent({
              id: createEventId(),
              title,
              start: event.startStr,
              end: event.endStr,
              allDay: event.allDay,
              color: event.color,
              extendedProps: {
                eventId: response.event.id
              }
            });
          }
          console.warn('cvent', event);
          this.getEventList();
          if (event.eventId && event.eventId > 0) {
            this.snackBar
              .open('Mise à jour avec succés', 'ok', {
                duration: 3000
              })
            ;
          }
        }
      });
  }

}
