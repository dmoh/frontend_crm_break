import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {CoreModule} from "../core/core.module";
import { OverviewComponent } from './overview/overview.component';
import { AdsComponent } from './ads/ads.component';
import {DashboardService} from "./dashboard.service";


@NgModule({
  declarations: [DashboardComponent, OverviewComponent, AdsComponent],
  imports: [
      CoreModule,
      DashboardRoutingModule,
  ],
  exports: [
      CoreModule,
      OverviewComponent
  ],
  providers: [
      DashboardService
  ]
})
export class DashboardModule { }
