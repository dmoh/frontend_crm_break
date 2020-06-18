import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {OverviewComponent} from "./overview/overview.component";
import {AdsComponent} from "./ads/ads.component";


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

    ]
},


  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
