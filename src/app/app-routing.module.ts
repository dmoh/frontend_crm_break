import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ContactViewComponent} from "@app/contact-view/contact-view.component";
import {NotFoundComponent} from "@app/not-found/not-found.component";


const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path: 'contact-view', component: ContactViewComponent},
    {path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
    },
  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
