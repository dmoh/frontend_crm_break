import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterEvent, RouterLink, RouterModule, Routes } from "@angular/router";
import { TaskService } from '@app/_services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  task : Task;
  taskForm: FormGroup;
  id: string;
  index;
  router: Router;
  tasks: Task[];

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
     const index = paramMap.get('index');
      console.log("index", index)
        if (index !== null) {
          this.task = this.taskService.getTask(index);
          //this.initForm(this.task);
          //console.log('thistask', this.task)
          //console.log("montask", this.task)
        }
      this.initForm(this.task);
    });
  }
  initForm(
    todo: Task = { id: null, tags: '', title: '', notes: '', completed: false, date: '', priorityName: '', priorityColor: '' }
    ) {
    this.taskForm = this.formBuilder.group({
      //description: this.formBuilder.group({

      id       : [todo.id],
      tags     : [todo.tags],
      title    : [todo.title],
      notes    : [todo.notes],
      completed: [todo.completed],
      date:      [todo.date],
      priorityName: [todo.priorityName],
      priorityColor: [todo.priorityColor],

      //priority: [todo.priority.name],

    })

  }


  onSubmit(): void {

    if (this.task) {
      this.taskService.EditTask(this.taskForm.value);

      console.log(this.taskForm.value, 'je suis un task')

      } else {
        //console.log('data', dataTodo)
        this.taskService.addTodo(this.taskForm.value);
        this.taskForm.reset();
    }
    //this.router.navigate(["task"]);
  }
}


