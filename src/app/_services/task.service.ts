
import { Injectable } from '@angular/core';
import { Task } from '@app/tasks/task';
import { BehaviorSubject } from 'rxjs';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  task: Task[];
  public task$: BehaviorSubject<Task[]> = new BehaviorSubject([
    { id: "1",
      title: 'Create the landing/marketing page and host it on the beta channel',
      notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
      completed: false,
      //edit: false,
      tags:'maison',
     /*priority: {
        name: 'low',
        color: 'green'
      },*/
      priorityName: 'hight',
      priorityColor: '#ef4444',
      date:'2021-08-15',
      //modif: false,
      //type: 'work'
    },
    { id: "2",
      title: 'Move dependency system to Yarn for easier package management',
      notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
      completed: false,
      //edit: false,
      tags: 'maison',
      priorityName: 'low',
      priorityColor: '#22c55e',
      /*priority: {
        name: 'hight',
        color: 'red'
      },*/
      date:'2021-08-08',
      //type: 'work'
    },
    { id: "3",
          title: 'Fix permission issues that the 0.0.7-alpha.2 has introduced',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priorityName: 'normal',
          priorityColor: '#3b82f6',
          date:'2021-08-19',
          //type: 'work'
        },
        { id: "4",
          title: 'Start Twitter promotions using the company Twitter account',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priorityName: 'low',
          priorityColor: '#22c55e',
          date:'2021-08-25',
          //type: 'task'
        },
        { id: "5",
          title: 'Add more error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priorityName: 'hight',
          priorityColor: '#ef4444',
          date:'2021-08-03',
          //type: 'task'
        },
        { id: "6",
          title: 'Add less error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priorityName: 'normal',
          priorityColor: '#3b82f6',
          date:'2021-08-07',
          //type: 'task'
        },

])
  //taskSubject = new Subject<any[]>();
  /*public selectedTask: BehaviorSubject<Task> = new BehaviorSubject(
    this.taskSubject.value[0];
  )*/

  constructor() {

    /*//this.getTodosFromServer();
    //setTimeout(() => {
      this.task = [
        { id: "1",
          title: 'Create the landing/marketing page and host it on the beta channel',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
         /priority: {
            name: 'low',
            color: 'green'
          },
          priorityName: 'hight',
          priorityColor: 'red',
          date:'2021-08-15',
          //modif: false,
          //type: 'work'
        },
        { id: "2",
          title: 'Move dependency system to Yarn for easier package management',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags: 'maison',
          priorityName: 'low',
          priorityColor: 'green',
         /*priority: {
            name: 'hight',
            color: 'red'
          },
          date:'2021-08-08',
          //type: 'work'

        },
        /*{ id: "3",
          title: 'Fix permission issues that the 0.0.7-alpha.2 has introduced',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priority: {
            name: 'hight',
            color: 'red'
          },
          date:'2021-08-19',
          //type: 'work'
        },
        { id: "4",
          title: 'Start Twitter promotions using the company Twitter account',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priority: {
            name: 'hight',
            color: 'red'
          },
          date:'2021-08-25',
          //type: 'task'
        },
        { id: "5",
          title: 'Add more error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priority: {
            name: 'hight',
            color: 'blue'
          },
          date:'2021-08-03',
          //type: 'task'
        },
        { id: "6",
          title: 'Add less error pages - 401, 301, 303, 500 etc.',
          notes: 'Et in lorem qui ipsum deserunt duis exercitation lorem elit qui qui ipsum tempor nulla velit aliquip enim consequat incididunt pariatur duis excepteur elit irure nulla ipsum dolor dolore est.Aute deserunt nostrud id non ipsum do adipisicing laboris in minim officia magna elit minim mollit elit velit veniam lorem pariatur veniam sit excepteur irure commodo excepteur duis quis in',
          completed: false,
          //edit: false,
          tags:'maison',
          priority: {
            name: 'hight',
            color: 'blue'
          },
          date:'2021-08-07',
          //type: 'task'
        },

      ];
      this.emitTodo();*/


  }

  makeColor(todoEdited:Task) {
    //this.task$.value.map((tache) => {
      if (todoEdited.priorityName === 'hight') {
        todoEdited.priorityColor = 'red';
      } else if (todoEdited.priorityName === 'low') {
        todoEdited.priorityColor = 'green';
      }else if (todoEdited.priorityName === 'normal') {
        todoEdited.priorityColor = 'blue';
      }
      //return editedCoktail
    //})

  }
  onChangeStatus(i: number) {
    const value = this.task$.value;
    value[i].completed = !value[i].completed;
    console.log('status', value[i].completed)
    //this.emitTodo();
  }
  /*onChangeIsModif(i: number) {
    this.task[i].edit = !this.task[i].edit;
  }*/
  getTask(index: string) {
    const tasks = this.task$.value;
    return tasks[index];
  }

  getTodo(index: number) {
    if (this.task[index]) {
    return this.task[index];
  }
    //this.emitTodo()
    //return false;
  }
  emitTodo() {
    const value = this.task$.value;
    this.task$.next(value);
    //this.taskSubject.error(new Error('oops'));
    //this.taskSubject.complete();
  }
  addTodo(todo: Task) {
    const value = this.task$.value;
    this.makeColor(todo);
    //todo.id = value.length + 1
    this.task$.next([...value, todo])
    //this.task.push(todo);
    //this.emitTodo();
  }
  EditTask(todoEdited: Task) {
    const value = this.task$.value;
    this.task$.next(
      value.map((tache) => {

        if (tache.id === todoEdited.id) {
          this.makeColor(todoEdited);
          return todoEdited
        }
        else {
          return tache;
        }
      })
    )
  }
  deleteTask(id: string) {
    const value = this.task$.value;
    this.task$.next(value.filter(todo => todo.id != id));
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
