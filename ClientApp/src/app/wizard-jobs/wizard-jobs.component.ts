import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MaterialModule } from '../material';
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

  constructor(private _formBuilder: FormBuilder, private _dataService: JobService) { 

    this.jobsFormGroup = this._formBuilder.group({
      employer: [''],
      title: [''],
      role: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadData();
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
    this.currentJob.userId = this.userId;
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
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    if (this.currentJob.id == undefined || this.currentJob.id == 0) {
      this.currentJob.id = --this.newJobId;
      this.jobs.push(this.currentJob);
    }

    this.retrieveData();

    if (this.currentJob.id < 1) {
      this._dataService.addJob(this.currentJob).subscribe(
        item => this.currentJob = item,
        error => alert('An error occurred while saving: ' + error),
        () => this.jobs.push(this.currentJob)
      );
    } else {
      this._dataService.updateJob(this.currentJob);
    }

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
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    let item: Job = this.findJob(employer);
    if (item.id > 0) {
      this._dataService.deleteJob(item.id);
    }

    let index: number = this.jobs.indexOf(item);
    this.jobs.splice(index, 1);
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

  public loadData() {
    this.deletedJobs = [];
    if (this.userId === 0) {
      this.jobs = [];
    } else {
      this._dataService.getJobs(this.userId).subscribe(items => this.jobs = items);
    }
  }

}
