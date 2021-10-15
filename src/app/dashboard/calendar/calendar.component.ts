import { Component, OnInit } from '@angular/core';
import { Task } from '@app/tasks/task';
import { TaskService } from '@app/_services/task.service';
//import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { INITIAL_EVENTS, createEventId } from './event.utils';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  tasks: Task[]=[];
  tasksSubscription: Subscription;
  calendarVisible = true;
  workVisible = false;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //eventColor: 'red'

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.task$.subscribe(
      (tasksRecup: Task[]) => {
        this.tasks = tasksRecup;
        console.log('taskRecup dans le calendrier', this.tasks)
      }
    );
    //this.taskService.emitTodo();
    this.tasks.map((task: any) => {

    //const events =  {title : task.title, date: task.date};
    this.calendarOptions.events =  this.tasks;
    console.log(this.tasks, 'events')
  })
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
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    console.log('currentEvent', this.currentEvents)
  }
}
