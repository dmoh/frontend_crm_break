import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '@app/_services/task.service';
import { Subscription } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  tasks: any;
  taskSub: Subscription;
  opened = false;
  taskOverdue;
  private index: string;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('id');
       /*console.log("index", index)
         if (index) {
           this.task = this.taskService.getTodo(+index);
         }
         this.initForm(this.task)
         console.log("task", this.task)*/
     });


    this.taskSub = this.taskService.taskSubject.subscribe(
      (value: any[]) => {
        this.tasks = value;
        console.log(this.tasks)
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('observable complétée');
      }
    );

    this.taskService.emitTodo();

    /*this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.tasks.id = paramMap.get('index');
      console.log("index", this.index)
      if (this.index) {
        this.tasks = this.taskService.getTodo(+this.index);
      }
    });*/

    }
    ngOnDestroy(): void {
      this.taskSub.unsubscribe();
    }
    onChangeStatus(i: number) {
      this.taskService.onChangeStatus(i);
    }
    /*onChangeIsModif(i: number) {
      this.taskService.onChangeIsModif(i);
    }*/
    deleteTask(id: number) {
      this.taskService.deleteTask(id)
    }
    emitTodo (){
      this.taskService.emitTodo()
    }
    getTodo (id: number) {
      this.taskService.getTodo(id)
      this.opened = true;
      console.log("id", id)
    }
}

