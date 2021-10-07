import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router";
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
  id:string;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
     const index = paramMap.get('id');
      console.log("index", index)
        if (index !== null) {
          this.task = this.taskService.getTodo(+index);
        }
        this.initForm(this.task)
        console.log("task", this.task)
    });
    //this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      //this.id = paramMap.get("id");


  }
  initForm (todo: Task = {id:null, tags:'', title:'', notes:'', completed: false, date:'', priority:''}){
    this.taskForm = this.formBuilder.group({
      //description: this.formBuilder.group({

      id       : [todo.id],
      tags     : [todo.tags],
      title    : [todo.title],
      notes    : [todo.notes],
      completed: [todo.completed],
      date  :    [todo.date],
      priority : [todo.priority],
  })
}

  onSubmit(): void {
    const dataTodo  = this.taskForm.value;
    console.log('data', dataTodo)
    //if(dataTodo.modif = true){
      //this.taskService.editTask(dataTodo);
      //this.taskForm.reset();
    //}else{
      this.taskService.addTodo(dataTodo);
      this.taskForm.reset();
    }

    //this.router.navigate(["todos"]);

  }


