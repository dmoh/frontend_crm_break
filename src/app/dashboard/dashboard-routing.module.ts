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
          path: 'task',
          component: ListComponent,
        },
        {
          path: 'details',
          component: DetailsComponent,
        },
      ]
},


  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
