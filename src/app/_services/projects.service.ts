import { Injectable } from '@angular/core';
import { Project } from '@app/dashboard/models/project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [];
  projectsSub = new Subject<Project[]>();

  constructor() { }

  emitProjects(): void{
    this.projectsSub.next(this.projects);
    console.log('projects', this.projects)
  }

  addProject(project: Project): void {
    this.projects.push(project);
    this.emitProjects();
  }
}
