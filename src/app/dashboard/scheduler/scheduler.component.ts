import { Component,ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
//import {scheduler} from "dhtmlx-scheduler";
//import {} from "@types/dhtmlxscheduler";
 let scheduler: any;

@Component({
  encapsulation : ViewEncapsulation.None ,
  selector: 'app-scheduler',
  //templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  template: `<div #scheduler_here class='schedul'></div>`,
})
export class SchedulerComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {

    //scheduler.init(this.schedulerContainer.nativeElement, new Date());
    //scheduler.dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    scheduler.init(this.schedulerContainer.nativeElement, new Date(2017, 8, 1));
  }

}
