import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {OverviewComponent} from './overview/overview.component';
import {AdsComponent} from './ads/ads.component';
import {ContactsComponent} from '@app/dashboard/contacts/contacts.component';
import {UsersComponent} from '@app/dashboard/users/users.component';
import { MembersComponent } from './members/members.component';
import { BillingComponent } from './billing/billing.component';
import { ListComponent } from '@app/tasks/list/list.component';
import { DetailsComponent } from '@app/tasks/details/details.component';
//import { GantComponent } from './gant/gant.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GanttComponent } from '@app/gantt/gantt.component';
import { ApexChartComponent } from '@app/apex-chart/apex-chart.component';
import { AreaChartComponent } from '@app/area-chart/area-chart.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { PipeDriveComponent } from './pipe-drive/pipe-drive.component';
import { TemplateMailComponent } from '@app/template-mail/template-mail.component';
import {ProspectComponent} from "@app/dashboard/prospect/prospect.component";
import {TrackingRecordComponent} from "@app/dashboard/tracking-record/tracking-record.component";
import {HistoryCollaboratorComponent} from "@app/dashboard/history-collaborator/history-collaborator.component";
import {ArchiveComponent} from "@app/dashboard/archive/archive.component";
//import { TaskComponent } from '@app/tasks/task.component';
//import { SchedulerComponent } from '@app/scheduler/scheduler.component';



const routes: Routes = [{
    path: '', component: DashboardComponent,
    children: [
        {
            path: 'overview',
            component: OverviewComponent,
        },
        {
            path: 'ads',
            component: AdsComponent,
        },
        {
            path: 'contacts',
            component: ContactsComponent,
            children: [
              { path: ":index", component: ContactFormComponent },
              { path: "", redirectTo: "0", pathMatch: "full" },
              { path: "new", component: ContactFormComponent },
            ],
        },
        {
            path: 'users',
            component: UsersComponent,
        },
        {
          path: 'members',
          component: MembersComponent,
        },
        {
          path: 'billing',
          component: BillingComponent,
      },
      {
        path: 'chart',
        component: AreaChartComponent,

      },
      {
        path: 'gant',
        //component: GantComponent,
        component: GanttComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,

      },
      {
      path: 'tracking-record',
      component: TrackingRecordComponent,

      },
      {
        path: 'history',
        component: HistoryCollaboratorComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'task',
        component: ListComponent,
        children: [
          { path: ":index", component: DetailsComponent },
          { path: "", redirectTo: "0", pathMatch: "full" },
          { path: "new", component: DetailsComponent },
        ],
      },
      {
        path: 'sales',
        component: PipeDriveComponent,
      },
      {
        path: 'email',
        component: TemplateMailComponent,
      },
      {
        path: 'prospect',
        component: ProspectComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
