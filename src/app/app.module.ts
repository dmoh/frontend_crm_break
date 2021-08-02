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

//import { MembersComponent } from './dashboard/members/members.component';
//import { BillingComponent } from './dashboard/billing/billing.component';
//import { TaskComponent } from './tasks/task.component';
//import { ListComponent } from './tasks/list/list.component';
//import { DetailsComponent } from './tasks/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactViewComponent,
    FooterComponent,
    //MembersComponent,
    //BillingComponent,
    //TaskComponent,
    //ListComponent,
    //DetailsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        NgbModule,
        GoogleMapsModule
    ],
  providers: [TaskService],
  bootstrap: [AppComponent],
  exports: [CoreModule, LoginComponent, ContactViewComponent, FooterComponent]
})
export class AppModule { }
