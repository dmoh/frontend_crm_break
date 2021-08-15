import { Injectable } from '@angular/core';
import { Project } from '@app/dashboard/models/project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  projects: Project[]=[];
  projectsSub = new Subject<Project[]>();

  constructor() {

    this.projects = [
      {
      title: 'Formation angular',
      memberName: 'Momo',
      priority: 'low',
      state: 10,
      date: '10/08/2021',
      dateStart: new Date(2021, 7, 21),
      dateEnd: new Date(2022, 6, 22),
    },
    {
      title: 'Formation react',
      memberName: 'Mamad',
      priority: 'low',
      state: 80,
      date: '10/08/2021',
      dateStart: new Date(2021, 8, 21),
      dateEnd: new Date(2022, 10, 22),
    },
    {
      title: 'Formation vue js',
      memberName: 'Ali',
      priority: 'low',
      state: 60,
      date: '10/08/2021',
      dateStart: new Date(2021, 9, 21),
      dateEnd: new Date(2022, 11, 22),
    },
    {
      title: 'Formation Java script',
      memberName: 'Jean',
      priority: 'low',
      state: 100,
      date: '10/08/2021',
      dateStart: new Date(2021, 12, 21),
      dateEnd: new Date(2022, 1, 22),
    },
    {
      title: 'Formation Python',
      memberName: 'Jean',
      priority: 'low',
      state: 20,
      date: '10/08/2021',
      dateStart: new Date(2021, 10, 22),
      dateEnd: new Date(2022, 10, 22),
    },
    {
      title: 'Formation PHP',
      memberName: 'Alex',
      priority: 'low',
      state: 45,
      date: '10/08/2021',
      dateStart: new Date(2021, 10, 22),
      dateEnd: new Date(2022, 10, 22),
    },
    {
      title: 'Formation Node JS',
      memberName: 'Mamad',
      priority: 'low',
      state: 45,
      date: '10/08/2021',
      dateStart: new Date(2021, 10, 22),
      dateEnd: new Date(2022, 10, 22),
    },
    {
      title: 'Formation Ful Stack',
      memberName: 'Momo',
      priority: 'low',
      state: 45,
      date: '10/08/2021',
      dateStart: new Date(2021, 10, 22),
      dateEnd: new Date(2022, 10, 22),
    },

  ]

  }

  emitProjects(): void{
    this.projectsSub.next(this.projects);
    console.log('projects', this.projects)
  }
  addProject(project: any): void {
    this.projects.push(project);
    this.emitProjects();
  }
}
