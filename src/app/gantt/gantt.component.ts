import {  Component, ElementRef, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { ProjectsService } from '@app/_services/projects.service';
import "dhtmlx-gantt";
import { gantt } from 'dhtmlx-gantt';

@Component({
  selector: 'app-gantt',
  styleUrls: ['./gantt.component.scss'],
  template: `<div #gantt_here class='gant'></div>`,
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements OnInit {
  gantt;

  @ViewChild("gantt_here", {static: true}) ganttContainer: ElementRef<HTMLElement>;

  constructor(private project: ProjectsService) {

  }

  ngOnInit(): void {
     gantt.config.columns = [
      {name:"text", label:"Projet", width:"*", tree:true },
      { name: "start_date", align: "center", resize: true, width: 150 },
      {name: "owner", align: "center", width: 75, label: "Owner", resize: true,
			template: function (task) {
				if(task.type == gantt.config.types.project){
					return "";
				}
        var store = gantt.getDatastore("resource");
				var ownerValue = task.owner_id;
				var singleResult = "";
				var result = "Unassigned";

				if (ownerValue) {
					if (!(ownerValue instanceof Array)) {
						ownerValue = [ownerValue];
					}
					ownerValue.forEach(function(ownerId) {
						var owner = store.getItem(ownerId);
						if (!owner)	{
							return;
						}
						if (singleResult === "") {
							result = singleResult = owner.text;
							return;
						}
						if (result === singleResult) {
							result = "<div class='owner-label' title='" + singleResult + "'>" + singleResult.substr(0, 1) + "</div>"
						}
						result += "<div class='owner-label' title='" + owner.text + "'>" + owner.text.substr(0, 1) + "</div>";
					});
				}
        return result;
			}
		},

    {name: "duration", width: 60, align: "center"},
		{name:"progress", label:"Status",  template:function(obj){
				return Math.round(obj.progress*100)+"%";
			}, align: "center", width:60 },
			{name:"priority", label:"Priority",  template:function(obj){
				return gantt.getLabel("priority", obj.priority);
			}, align: "center", width:60 },
			{name:"add", label:"", width:44 }
     ];
    gantt.init(this.ganttContainer.nativeElement);

    Promise.all([this.project.get()])
    .then(([data]) => {
      console.warn('data receive', data);
     gantt.parse({'tasks': data});
    });
  }
}
    /* const dp = gantt.createDataProcessor({
      task: {
          update: (data) => this.insertUpdateFake(data),
          create: (data) => this.insertUpdateFake(data),
          delete: (id) => this.insertUpdateFake(id)
      }
    });*/

    /*this.gantt.container = this.elementRef.nativeElement;
    const gantt = Gantt.getGanttInstance(this.gantt);
    this.gantt = gantt;*/

  /*private insertUpdateFake(data) {
    console.warn('update', data);
    return;
  }*/

