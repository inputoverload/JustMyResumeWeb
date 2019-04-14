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
  userId: number;

  async getJobs()
  {
    this.jobs = await this.jobService.getUserJobs(this.userId);
  }

  constructor(private activeRoute: ActivatedRoute, private jobService: JobService, private location: Location) {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.getJobs();
  }

}
