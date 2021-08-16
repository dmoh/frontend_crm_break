import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '@app/_services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  task = new Task;
  //todo = new Task;
  //tag: Tag[];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.taskForm = this.formBuilder.group({
      //description: this.formBuilder.group({

      id       : [this.task.id],
      tags     : [this.task.tags],
      title    : [this.task.title],
      notes    : [this.task.notes],
      completed: [false],
      date  : [this.task.notes],
      priority : [this.task.priority],

      //order    : [0]
      //})
  });
}
  onSubmit(): void {
    const dataTodo  = this.taskForm.value;
    console.log('data', dataTodo)
    this.taskService.addTodo(dataTodo);
    this.taskForm.reset();
    //this.router.navigate(["todos"]);

  }

}
