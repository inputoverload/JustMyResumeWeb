import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../models/project';
import { ProjectService } from '../dataServices/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  getProjects(id: number)
  {
    this.projectService.getUserProjects(id).subscribe(projects => this.projects = projects);
  }

  constructor(private activeRoute: ActivatedRoute, private projectService: ProjectService, private location: Location) { }

  ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getProjects(id);
  }
}
