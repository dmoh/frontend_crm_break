import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {CoreModule} from "../core/core.module";
import { OverviewComponent } from './overview/overview.component';
import { AdsComponent } from './ads/ads.component';
import {DashboardService} from "./dashboard.service";
import {ContactsComponent} from "@app/dashboard/contacts/contacts.component";
import { UsersComponent } from './users/users.component';
import { ChartComponent } from './overview/chart/chart.component';
import { ChartBarComponent } from './overview/chart-bar/chart-bar.component';
import { DetailsComponent } from '@app/tasks/details/details.component';
import { ListComponent } from '@app/tasks/list/list.component';
import { MembersComponent } from './members/members.component';
import { BillingComponent } from './billing/billing.component';
import { TaskComponent } from '@app/tasks/task.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './calendar/calendar.component';
//import { SchedulerComponent } from '@app/scheduler/scheduler.component';
//import { GanttComponent } from '@app/gantt/gantt.component';
//import { GanttComponent } from '@app/gantt/gantt.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])



@NgModule({
  declarations: [DashboardComponent, OverviewComponent, AdsComponent, ContactsComponent, UsersComponent, ChartComponent, ChartBarComponent, MembersComponent,
    BillingComponent, TaskComponent,DetailsComponent, ListComponent, CalendarComponent],
  imports: [
      CoreModule,
      DashboardRoutingModule,
      FullCalendarModule,
  ],
  exports: [
      CoreModule,
      OverviewComponent,
      ContactsComponent,
      MembersComponent,
      BillingComponent,
      TaskComponent,
      UsersComponent,
      ChartComponent,
      ChartBarComponent,
      CalendarComponent,
      //SchedulerComponent
      //GanttComponent,

  ],
  providers: [
      DashboardService
  ]
})
export class DashboardModule { }
