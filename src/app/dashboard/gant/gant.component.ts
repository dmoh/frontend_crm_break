import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProjectComponent } from '@app/add-project/add-project.component';
import { ProjectsService } from '@app/_services/projects.service';
import { Subscription } from 'rxjs';
import { Project } from '../models/project';
//import { TaskService } from '@app/_services/task.service';
//import { Task } from '@app/tasks/task';

@Component({
  selector: 'app-gant',
  templateUrl: './gant.component.html',
  styleUrls: ['./gant.component.scss'],
  providers: [MatSnackBar]
})
export class GantComponent implements OnInit {

  //tasks: Task[]=[];
  //tasksSubscription: Subscription;
  projects: Project[]=[];
  projectsSubscription: Subscription;


  constructor( private dialog: MatDialog, private snackBar: MatSnackBar, private projectService: ProjectsService) { }

  ngOnInit(): void {

    this.projectsSubscription = this.projectService.projectsSub.subscribe(
      (projectsRecup: Project[]) => {
        this.projects = projectsRecup;
        console.log('projectRecup dans le gant', this.projects)
      }
    );
    this.projectService.emitProjects();

    /*this.tasksSubscription = this.taskService.taskSubject.subscribe(
      (tasksRecup: Task[]) => {
        this.tasks = tasksRecup;
        console.log('taskRecup dans le gant', this.tasks)
      }
    );
    this.taskService.emitTodo();*/

    google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      const data = new google.visualization.DataTable();
        data.addColumn('string', 'Task ID');
        data.addColumn('string', 'Task Name');
        data.addColumn('string', 'Resource');
        data.addColumn('date', 'Start Date');
        data.addColumn('date', 'End Date');
        data.addColumn('number', 'Duration');
        data.addColumn('number', 'Percent Complete');
        data.addColumn('string', 'Dependencies');

      data.addRows([
        ['2014Spring', 'Spring 2014', 'spring',
         new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
        ['2014Summer', 'Summer 2014', 'summer',
         new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
        ['2014Autumn', 'Autumn 2014', 'autumn',
         new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
        ['2014Winter', 'Winter 2014', 'winter',
         new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
        ['2015Spring', 'Spring 2015', 'spring',
         new Date(2015, 2, 22), new Date(2015, 5, 20), null, 50, null],
        ['2015Summer', 'Summer 2015', 'summer',
         new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
        ['2015Autumn', 'Autumn 2015', 'autumn',
         new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
        ['2015Winter', 'Winter 2015', 'winter',
         new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
        ['Football', 'Football Season', 'sports',
         new Date(2014, 8, 4), new Date(2015, 1, 1), null, 100, null],
        ['Baseball', 'Baseball Season', 'sports',
         new Date(2015, 2, 31), new Date(2015, 9, 20), null, 14, null],
        ['Basketball', 'Basketball Season', 'sports',
         new Date(2014, 9, 28), new Date(2015, 5, 20), null, 86, null],
        ['Hockey', 'Hockey Season', 'sports',
         new Date(2014, 9, 8), new Date(2015, 5, 21), null, 89, null]
      ]);
      const options = {
        height: 400,
        gantt: {
          trackHeight: 30
        }
      };
      const chart = new google.visualization.Gantt(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, { // todo globaliser modal
        width: '80%',
        data: new Project,
    });
      dialogRef.afterClosed().subscribe(result=> {

        if (result) {
            this.snackBar.open( 'Projet Ajouté', 'Annulé',{duration: 3000});
        }
        console.log(result, 'result');
      });
    }
 }
