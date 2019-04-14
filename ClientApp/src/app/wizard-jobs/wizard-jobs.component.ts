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

  async ngOnInit() {
    await this.loadData();
    this.addNew();
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
    this.currentJob.userId = this.userId;
    this.currentJob.employer = "";
  }

  cancel() {
    this.addNew();
  }

  public async loadData() {
    if (this.userId === 0) {
      this.jobs = [];
    } else {
      this.jobs = await this._dataService.getUserJobs(this.userId);
    }
  }

  async save() {
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    this.retrieveData();

    if (!this.currentJob.id) {
      try {
        this.jobs.push(await this._dataService.addJob(this.currentJob));
        this.addNew();
      } catch (error) {
        alert('An error occurred while saving: ' + error.message);
      }
    } else {
      await this._dataService.updateJob(this.currentJob);
      this.addNew();
    }
  }

  edit(employer: string) {
    this.currentJob = this.findJob(employer);
    this.displayData();
  }

  findJob(employer: string): Job {
    return this.jobs.find(item => item.employer == employer);
  }

  async delete(employer: string) {
    let item: Job = this.findJob(employer);
    await this._dataService.deleteJob(item.id);

    let index: number = this.jobs.indexOf(item);
    this.jobs.splice(index, 1);

    this.addNew();
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
