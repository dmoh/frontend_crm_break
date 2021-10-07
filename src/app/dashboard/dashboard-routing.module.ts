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
          path: 'task',
          component: ListComponent,
          children : [
            { path: ":id", component: DetailsComponent },
            { path: "", redirectTo: "1", pathMatch: "full" },
            { path: "new", component: DetailsComponent },
           // { path: ":id/edit", component: DetailsComponent },

            ],
        },
        /*{
          path: 'details',
          component: DetailsComponent,

        },*/
        {
          path: 'gant',
          //component: GantComponent,
          component: GanttComponent,
        },
        {
          path: 'calendar',
          component: CalendarComponent,

      },

      ]
},


  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
