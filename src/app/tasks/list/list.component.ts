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

  low ='low';
  hight = 'hight';
  normal = "blue";
  green: boolean = false;
  blue: boolean = false;
  red: boolean = false;
  //@Input() tasks?: Task[];
  tasks: Task[];
  tache: Task;
  taskSub: Subscription = new Subscription;
  opened = false;
  modif: boolean = false;
  nbTaskSub;
  color;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index');
      console.log("index", index)
      this.tache = this.taskService.getTask(paramMap.get('index'));
      //console.log(this.tache, "le task")
     /* if (this.tache.priorityName = this.low) {
        this.green = true;
      } else if (this.tache.priorityName = this.hight) {
        this.red = true;*
      }*/
       /*  if (index)
           this.task = this.taskService.getTodo(+index);
         }
         this.initForm(this.task)
         console.log("task", this.task)*/
     });

    this.taskSub.add(
      this.taskService.task$.subscribe(
      (value: any[]) => {
          this.tasks = value;
          console.log(this.tache, "l'autre tache")
        },
      )
    );
    this.taskSub.add(
      this.taskService.task$.subscribe(
      (value: any[]) => {
        this.nbTaskSub = value;
        //console.log('total', this.nbTaskSub.length)
        },
      )
    );
    //this.taskService.emitTodo()
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
    deleteTask(id:string) {
      this.taskService.deleteTask(id);
    }
    /*emitTodo (){
      //this.taskService.emitTodo()
    }*/
    getTodo (id) {
      this.taskService.getTodo(id)
      this.opened = true;
      //console.log("id", id)
      this.modif = true;
  }
}

