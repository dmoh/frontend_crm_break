import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { FooterComponent } from './footer/footer.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { TaskService } from './_services/task.service';
import { GantComponent } from './dashboard/gant/gant.component';
import { GoogleChartsConfig, GoogleChartsModule, GOOGLE_CHARTS_LAZY_CONFIG } from 'angular-google-charts';
import { ReplaySubject } from 'rxjs';
export const googleChartsConfigSubject = new ReplaySubject<GoogleChartsConfig>(1);
//import { FullCalendarModule } from '@fullcalendar/angular';
//import dayGridPlugin from '@fullcalendar/daygrid';
//import { CalendarComponent } from './dashboard/calendar/calendar.component';
//import timeGridPlugin from '@fullcalendar/timegrid';
//import listPlugin from '@fullcalendar/list';
//import interactionPlugin from '@fullcalendar/interaction';

/*FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactViewComponent,
    FooterComponent,
    GantComponent,
    //CalendarComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        NgbModule,
        GoogleMapsModule,
        GoogleChartsModule.forRoot({ version: 'current', mapsApiKey: ''}),
        //FullCalendarModule,
    ],
  providers: [
    TaskService,
    {provide: GOOGLE_CHARTS_LAZY_CONFIG, useValue: googleChartsConfigSubject.asObservable()}


  ],
  bootstrap: [AppComponent],
  exports: [CoreModule, LoginComponent, ContactViewComponent, FooterComponent]
})
export class AppModule { }
