import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProjectComponent } from '@app/add-project/add-project.component';
import { ProjectsService } from '@app/_services/projects.service';
import { Subscription } from 'rxjs';
import { Project } from '../models/project';

@Component({
  selector: 'app-gant',
  templateUrl: './gant.component.html',
  styleUrls: ['./gant.component.scss'],
  providers: [MatSnackBar]
})
export class GantComponent implements OnInit, OnDestroy {

  projects: Project[]=[];
  projectsSubscription: Subscription;
  rows: any[];
  affichage: boolean = false;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private projectService: ProjectsService) { }

  ngOnInit(): void {

    this.projectsSubscription = this.projectService.projectsSub.subscribe(
      (projectsRecup: Project[]) => {
        this.projects = projectsRecup;
        console.log('projectRecup dans le gant', this.projects);
          //if(this.projects.length === 0){
            //this.affichage = true
         // }else{
          this.initChart(this.projects);
        }

    );
    this.projectService.emitProjects();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
        width: '80%',
        data: new Project,
    });
      dialogRef.afterClosed().subscribe(result=> {
      if (result) {
            this.snackBar.open( 'Projet Ajouté', 'Annulé',{duration: 3000});
          }
          this.projectService.addProject(result);
          console.log(result, 'result');
        });
  }

  initChart(projects: Project[]) {
    google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart()  {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('string', 'Resource');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');

      let rows = [];
      // generer les données au bon format
      projects.forEach((project: Project, index) => {
        const projectCustom =  [index.toString(), project.title, project.memberName,
          project.dateStart, project.dateEnd, null, project.state, null];
          // ['2014Spring', 'Spring 2014', 'spring',
          //new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
          //row.push(projectCustom)
         rows = [projectCustom, ...rows];
      })
      data.addRows(
        rows
      );
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
  ngOnDestroy () {
    this.projectsSubscription.unsubscribe()
  }
}



