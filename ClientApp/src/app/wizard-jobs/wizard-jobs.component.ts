import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Job } from '../models/job';

@Component({
  selector: 'app-wizard-jobs',
  templateUrl: './wizard-jobs.component.html',
  styleUrls: ['./wizard-jobs.component.css']
})
export class WizardJobsComponent implements OnInit {
  jobsFormGroup:  FormGroup;

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

  ngOnInit() {
  }

}
