import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

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

    }
    ngOnDestroy(): void {
      this.taskSub.unsubscribe();
    }
    onChangeStatus(i: number) {
      this.taskService.onChangeStatus(i);
    }
    onChangeIsModif(i: number) {
      this.taskService.onChangeIsModif(i);
    }
    deleteTask(id: number) {
      this.taskService.deleteTask(id)
    }
    emitTodo (){
      this.taskService.emitTodo()
    }
}

