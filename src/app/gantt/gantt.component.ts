import {  Component, ElementRef, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import "dhtmlx-gantt";
import { gantt } from 'dhtmlx-gantt';
//import ganttConfig from 'ganttConfig';

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: 'app-gantt',
  //templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  //providers: [TaskService, LinkService],
 //template: `<div #gantt_here class='gant'></div>`,
  template: `<div #gantt_here class='gant'></div>`,
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements OnInit {
  gantt;

  @ViewChild("gantt_here", {static: true}) ganttContainer: ElementRef<HTMLElement>;

  constructor(
    //private  ganttContainer : ElementRef<any>
    ) {

  }



  //constructor() { }

  ngOnInit(): void {
     gantt.init(this.ganttContainer.nativeElement);
    /*this.gantt.container = this.elementRef.nativeElement;
    const gantt = Gantt.getGanttInstance(this.gantt);
    this.gantt = gantt;*/
  }


}
