import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {CoreModule} from "../core/core.module";
import { OverviewComponent } from './overview/overview.component';
import { AdsComponent } from './ads/ads.component';


@NgModule({
  declarations: [DashboardComponent, OverviewComponent, AdsComponent],
  imports: [
      CoreModule,
      DashboardRoutingModule,
  ],
    exports: [
        CoreModule,
        OverviewComponent
    ]
})
export class DashboardModule { }
