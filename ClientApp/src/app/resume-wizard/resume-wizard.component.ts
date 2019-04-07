import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MaterialModule } from '../material';

import { WizardJobsComponent } from '../wizard-jobs/wizard-jobs.component';
import { WizardUserComponent } from '../wizard-user/wizard-user.component';
import { WizardSkillsComponent } from '../wizard-skills/wizard-skills.component';


export interface ITechSkill
{
  skillCategoryId: number,
  name: string,
  skillLevel: string,
  sortOrder: number
}

@Component({
  selector: 'app-resume-wizard',
  templateUrl: './resume-wizard.component.html',
  styleUrls: ['./resume-wizard.component.css']
})
export class ResumeWizardComponent implements OnInit {
  // languageSkillsFormGroup: FormGroup;
  // apiSkillsFormGroup: FormGroup;
  // DbSkillsFormGroup: FormGroup;
  //educationFormGroup: FormGroup;
  //projectFormGroup: FormGroup;

  @ViewChild(WizardUserComponent) wizardUser: WizardUserComponent;
  @ViewChild(WizardJobsComponent) wizardJobs: WizardJobsComponent;
  @ViewChild(WizardSkillsComponent) wizardSkillLanguages: WizardSkillsComponent;
  @ViewChild(WizardSkillsComponent) wizardSkillApi: WizardSkillsComponent;
  @ViewChild(WizardSkillsComponent) wizardSkillsDb: WizardSkillsComponent;

  get userFormGroup() {
    return this.wizardUser ? this.wizardUser.userFormGroup : null;
  }

  get jobsFormGroup() {
    return this.wizardJobs ? this.wizardJobs.jobsFormGroup : null;
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}
