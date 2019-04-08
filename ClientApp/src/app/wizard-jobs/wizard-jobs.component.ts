import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MaterialModule } from '../material';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../models/job';
import { JobService } from '../dataServices/job.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-wizard-jobs',
  templateUrl: './wizard-jobs.component.html',
  styleUrls: ['./wizard-jobs.component.css']
})
export class WizardJobsComponent implements OnInit {
  @Input("userId")
  userId: number;

  jobsFormGroup: FormGroup;
  currentJob: Job;
  newJobId: number = 0;

  pageIndex: number = 0;
  pageSize: number = 5;
  lowValue: number = 0;
  highValue: number = 5; 

  jobs: Job[] = [];
  deletedJobs: Job[] = [];
  columnsToDiplay = ['employer', 'actions'];

  constructor(private _formBuilder: FormBuilder, private _jobService: JobService) { 

    this.jobsFormGroup = this._formBuilder.group({
      employer: [''],
      title: [''],
      role: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });
  }

  displayData() {
    this.jobsFormGroup.get("employer").setValue(this.currentJob.employer);
    this.jobsFormGroup.get("startDate").setValue(this.currentJob.startDate);
    this.jobsFormGroup.get("endDate").setValue(this.currentJob.endDate);
    this.jobsFormGroup.get("description").setValue(this.currentJob.description);
    this.jobsFormGroup.get("title").setValue(this.currentJob.title);
    this.jobsFormGroup.get("role").setValue(this.currentJob.role);
  }

  retrieveData() {
    this.currentJob.employer = this.jobsFormGroup.get("employer").value;
    this.currentJob.startDate = this.jobsFormGroup.get("startDate").value;
    this.currentJob.endDate = this.jobsFormGroup.get("endDate").value;
    this.currentJob.description = this.jobsFormGroup.get("description").value;
    this.currentJob.title = this.jobsFormGroup.get("title").value;
    this.currentJob.role = this.jobsFormGroup.get("role").value;
  }

  clearData() {
    this.jobsFormGroup.get("employer").setValue('');
    this.jobsFormGroup.get("startDate").setValue('');
    this.jobsFormGroup.get("endDate").setValue('');
    this.jobsFormGroup.get("description").setValue('');
    this.jobsFormGroup.get("title").setValue('');
    this.jobsFormGroup.get("role").setValue('');
  }

  addNew() {
    this.clearData();
    this.currentJob = new Job();
  }

  cancel() {
    this.currentJob = null;
    this.clearData();
  }

  save() {
    if (this.currentJob == null) {
      alert("You must click Add New or Edit before you can enter job information.");
      return;
    }

    if (this.currentJob.id == undefined || this.currentJob.id == 0) {
      this.currentJob.id = --this.newJobId;
      this.jobs.push(this.currentJob);
    }

    this.retrieveData();

    this.clearData();
    this.currentJob = null;
  }

  edit(employer: string) {
    this.currentJob = this.findJob(employer);
    this.displayData();
  }

  findJob(employer: string): Job {

    return this.jobs.find<Job>(item => item.employer == employer);
  }

  delete(employer: string) {
    let job: Job = this.findJob(employer);
    let index: number = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);

    if (job.id < 1) {
      return;
    } else {
      this.deletedJobs.push(job);
    }
  }

  ngOnInit() {
  }

  getPaginatorData(event) {

    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  public saveData() {
    let item: Job;

    for (let i: number; this.jobs.length > i; i++)
    {
      item = this.jobs[i];
      this._jobService.updateJob(item);
    }

    for (let i: number; this.deletedJobs.length > i; i++) {
      item = this.jobs[i];
      this._jobService.deleteJob(item.id);
    }

  }

  public loadData() {
    this.deletedJobs = [];
    if (this.userId === 0) {
      this.jobs = [];
    }
    this.jobs = this.userId == 0 ? [] : this._jobService.getJobs(this.userId);
  }

}
