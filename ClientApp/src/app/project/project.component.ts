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
  userId: number;
  projects: Project[];

  async getProjects()
  {
    try {
      this.projects = await this.projectService.getUserProjects(this.userId);
    } catch (error) {
      console.warn("error in projects: " + error.message);
    }
  }

  constructor(private activeRoute: ActivatedRoute, private projectService: ProjectService, private location: Location) {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.getProjects();
  }
}
