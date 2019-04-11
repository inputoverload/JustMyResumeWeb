import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Job } from '../models/job';
import { JobService } from '../dataServices/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobs: Job[];

  getJobs(id: number)
  {
    this.jobService.getUserJobs(id).subscribe(jobs => this.jobs = jobs);
  }

  constructor(private activeRoute: ActivatedRoute, private jobService: JobService, private location: Location) { }

  ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getJobs(id);
  }

}
