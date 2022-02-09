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
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './calendar/calendar.component';
import { ApexChartComponent } from '@app/apex-chart/apex-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AreaChartComponent } from '@app/area-chart/area-chart.component';
import { BasicChartComponent } from '@app/basic-chart/basic-chart.component';
import { ColortaskDirective } from '@app/tasks/colortask.directive';
//import { ContactFormComponent } from '@app/dashboard/contacts/contact-form/contact-form.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
//import { DialogModalComponent } from '@app/dialog-modal/dialog-modal.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { PipeDriveComponent } from './pipe-drive/pipe-drive.component';
import { OfferModalComponent } from './pipe-drive/offer-modal/offer-modal.component';
import { DragDirective } from './pipe-drive/drag.directive';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from "@angular/material/stepper";
import {MatChipsModule} from "@angular/material/chips";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ContainerModalComponent } from './container-modal/container-modal.component';

//import { FilterPipe } from './filter.pipe';
//import { NgApexchartsModule } from 'ng-apexcharts';
//import { SchedulerComponent } from '@app/scheduler/scheduler.component';
//import { GanttComponent } from '@app/gantt/gantt.component';
//import { GanttComponent } from '@app/gantt/gantt.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";

import 'moment/locale/fr';
import { TrackingRecordComponent } from './tracking-record/tracking-record.component';
import { BuyerGeoComponent } from '../buyer-geo/buyer-geo.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { EventModalComponent } from '../event-modal/event-modal.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])



@NgModule({
  declarations: [
    DashboardComponent, OverviewComponent, AdsComponent, ContactsComponent, UsersComponent, ChartComponent, ChartBarComponent, MembersComponent,
    BillingComponent,DetailsComponent, ListComponent, CalendarComponent, AreaChartComponent, ApexChartComponent, BasicChartComponent, ColortaskDirective, ContactsComponent, ContactFormComponent, PipeDriveComponent,
    OfferModalComponent,
    DragDirective,
    ContainerModalComponent,
    TrackingRecordComponent,
    BuyerGeoComponent,
    EventModalComponent
  ],
  imports: [
    CoreModule,
    DashboardRoutingModule,
    FullCalendarModule,
    NgApexchartsModule,
    MatDialogModule,
    SweetAlert2Module,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,

  ],
  exports: [
      CoreModule,
      OverviewComponent,
      ContactsComponent,
      MembersComponent,
      BillingComponent,
      AdsComponent,
      UsersComponent,
      ChartComponent,
      ChartBarComponent,
      CalendarComponent,
      AreaChartComponent,
      ApexChartComponent,
      BasicChartComponent,
      ContainerModalComponent,
      TrackingRecordComponent,
      BuyerGeoComponent,
      EventModalComponent,

      //SchedulerComponent
      //GanttComponent,

  ],
  providers: [
    DashboardService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr'}
  ]
})
export class DashboardModule { }
