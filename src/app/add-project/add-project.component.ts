import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '@app/dashboard/models/project';
import { ProjectsService } from '@app/_services/projects.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  //project: Project;
  projectForm: FormGroup;
  dataProject: any;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public project: Project,
  public dialogRef: MatDialogRef<AddProjectComponent>, private projectService: ProjectsService) { }

  ngOnInit(): void {

    this.projectForm = this.fb.group({
      title: [this.project.title],
      priority: [this.project.priority],
      memberName: [this.project.memberName],
      state: [this.project.state],
      date: [this.project.date],
      dateStart: [this.project.dateStart],
      dateEnd: [this.project.dateEnd],
    })

  }
  onSubmit() {
    //this.dialogRef.close(this.dataProject)
    const dataProject  = this.projectForm.value;
    this.projectService.addProject(dataProject);
    this.dialogRef.close(dataProject)
    console.log('data project', dataProject)
  }
}
