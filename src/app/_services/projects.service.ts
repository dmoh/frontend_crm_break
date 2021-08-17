import { Injectable } from '@angular/core';
import { Project } from '@app/dashboard/models/project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ProjectsService {

  tasks = [
    {id: 1, text: "Formation Angular", start_date: "2021-08-15 10:00", duration: 3, progress: 0.6},
    {id: 2, text: "Formation React", start_date: "2021-08-18 08:00", duration: 6, progress: 0.4},
    {id: 3, text: "Formation Node", start_date: "2021-08-10 09:00", duration: 10, progress: 0.3},
    {id: 4, text: "Formation PHP", start_date: "2021-08-29 12:00", duration: 3, progress: 0.1},
    {id: 5, text: "Formation CSS", start_date: "2021-08-05 14:00", duration: 5, progress: 0.9},
    {id: 6, text: "Formation Python", start_date: "2021-08-07 10:00", duration: 8, progress: 0.4},
    {id: 7, text: "Formation Java", start_date: "2021-08-20 10:00", duration: 2, progress: 0.7},

  ];

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


  get(): Promise<any[]>{
    return Promise.resolve([
        {id: 1, text: "Formation Angular", start_date: new Date(2021, 8, 22), duration: 3, progress: 0.6, open: true},
        {id: 2, text: "Formation React", start_date: new Date(2021, 8, 22), duration: 6, progress: 0.4, priority: "haute"},
        {id: 3, text: "Formation Node", start_date: new Date(2021, 8, 22), duration: 10, progress: 0.3, priority: "haute"},
        {id: 4, text: "Formation PHP", start_date: new Date(2021, 8, 22), duration: 3, progress: 0.1, priority: "haute"},
        {id: 5, text: "Formation CSS", start_date: new Date(2021, 8, 22), duration: 5, progress: 0.9, priority: "haute"},
        {id: 6, text: "Formation Python", start_date: new Date(2021, 8, 22), duration: 8, progress: 0.4, priority: "haute"},
        {id: 7, text: "Formation Java", start_date: new Date(2021, 8, 22), duration: 2, progress: 0.7, priority: "haute"},
    ]);
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
