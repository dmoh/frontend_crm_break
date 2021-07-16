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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactViewComponent,
    FooterComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        NgbModule,
        GoogleMapsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [CoreModule, LoginComponent, ContactViewComponent, FooterComponent]
})
export class AppModule { }
