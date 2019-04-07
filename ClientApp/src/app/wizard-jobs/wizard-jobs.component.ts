import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MaterialModule } from '../material';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../models/job';

@Component({
  selector: 'app-wizard-jobs',
  templateUrl: './wizard-jobs.component.html',
  styleUrls: ['./wizard-jobs.component.css']
})
export class WizardJobsComponent implements OnInit {
  jobsFormGroup: FormGroup;
  currentJob: Job;
  newJobId: number = 0;
  dataSource: MatTableDataSource<Job> = new MatTableDataSource<Job>();

  pageIndex: number = 0;
  pageSize: number = 5;
  lowValue: number = 0;
  highValue: number = 5; 

  jobs: Job[] = [{ id: 1, userId: 1, employer: "ABC Inc", title: "Janitor", role: "floor sweeper", description: "I swept.", startDate: "May 2001", endDate: "Dec 2004", sortOrder: 0 },
    { id: 2, userId: 1, employer: "Longname Consolidated Couriers", title: "Janitor", role: "floor mopper", description: "I mopped.", startDate: "Jan 2005", endDate: "Jun 2009", sortOrder: 0 }];
  columnsToDiplay = ['employer', 'actions'];

  constructor(private _formBuilder: FormBuilder) { 

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
    this.currentJob = this.jobs.find<Job>(item => item.employer == employer);
    this.displayData();
  }

  ngOnInit() {
    this.dataSource.data = this.jobs;
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

}
