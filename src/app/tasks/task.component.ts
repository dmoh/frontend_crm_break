/*import { Component, OnInit } from '@angular/core';
import { TaskService } from '@app/_services/task.service';
import { Subscription } from 'rxjs';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[];

  nbTaskSub;
  taskSub: Subscription = new Subscription;
  constructor( private taskService: TaskService,) { }

  ngOnInit(): void {
    this.taskSub.add(
      this.taskService.task$.subscribe(
      (value: any[]) => {
        this.tasks = value;
        //console.log(this.tasks)
        },
      )
    );
    /*this.taskSub.add(
      this.taskService.task$.subscribe(
      (value: any[]) => {
        this.nbTaskSub = value;
        //console.log('total', this.nbTaskSub.length)
        },
      )
    );
  }

}*/
