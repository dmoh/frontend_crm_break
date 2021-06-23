import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {CoreModule} from "../core/core.module";
import { OverviewComponent } from './overview/overview.component';
import { AdsComponent } from './ads/ads.component';
import {DashboardService} from "./dashboard.service";
import {ContactsComponent} from "@app/dashboard/contacts/contacts.component";
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [DashboardComponent, OverviewComponent, AdsComponent, ContactsComponent, UsersComponent],
  imports: [
      CoreModule,
      DashboardRoutingModule,
  ],
  exports: [
      CoreModule,
      OverviewComponent,
      ContactsComponent,
      UsersComponent
  ],
  providers: [
      DashboardService
  ]
})
export class DashboardModule { }
