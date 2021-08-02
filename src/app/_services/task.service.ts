import { Injectable } from '@angular/core';
import { Task } from '@app/tasks/task';
import { Subject } from 'rxjs';

@Injectable()

export class TaskService {
  task: Task[];
  taskSubject = new Subject<any[]>();

  constructor() {
    //this.getTodosFromServer();
    //setTimeout(() => {
      this.task = [
        { id: 1,
          title: 'Create the landing/marketing page and host it on the beta channel',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'normal',
          date:"01/08/2021"
        },
        { id: 2,
          title: 'Move dependency system to Yarn for easier package management',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'normal',
          date:"01/08/2021"

        },
        { id: 3,
          title: 'Fix permission issues that the 0.0.7-alpha.2 has introduced',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'low',
          date:"01/08/2021"
        },
        { id: 4,
          title: 'Start Twitter promotions using the company Twitter account',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'hight',
          date:"01/08/2021"
        },
        { id: 5,
          title: 'Add more error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'normal',
          date:"01/08/2021"
        },
        { id: 6,
          title: 'Add more error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          edit: false,
          tags:'maison',
          priority:'normal',
          date:"01/08/2021"
        },

      ];
      //this.emitTodo();

  }

  onChangeStatus(i: number) {
    this.task[i].completed = !this.task[i].completed;
    console.log('status', this.task[i].completed)
    this.emitTodo();

  }
  onChangeIsModif(i: number) {
    this.task[i].edit = !this.task[i].edit;
  }

  getTodo(index: number) {
    if (this.task[index]) {
      return this.task[index];
    }
    return false;
  }
  emitTodo() {
    this.taskSubject.next(this.task);
  }
  addTodo(todo: Task) {
    this.task.push(todo);
    this.emitTodo();
  }
   deleteTask(id: number) {
   this.task = this.task.filter(todo=> todo.id != id);
   this.emitTodo();
  }
  get todos(): Task[] {
    return this.task.filter(todo=> todo.completed);
  }
  get todosCompleted(): Task[] {
    return this.task.filter(todo=> !todo.completed);
  }
  get countTodos(): number {
    return this.todos.length;
  }
  get countTodosCompleted(): number {
    return this.todosCompleted.length;
  }

  /*saveTodosFromServer(): void {
    this.httpClient
      .put(
        'https://todo-list-app-65fa7-default-rtdb.firebaseio.com/todos.json',
        this.todos
      )
      .subscribe(
        () => {
          console.log('données enregistrées avec succes');
        },
        (error) => {
          console.log('erreur de sauvegarde', error);
        }
      );
  }
  getTodosFromServer(): void {
    this.httpClient
      .get(
        'https://todo-list-app-65fa7-default-rtdb.firebaseio.com/todos.json',
        this.todos
      )
      .subscribe(
        (todoRecup) => {
          this.todos = todoRecup;
          this.emitTodo();
        },
        (error) => {
          console.log('erreur de sauvegarde', error);
        }
      );
  }*/
}
