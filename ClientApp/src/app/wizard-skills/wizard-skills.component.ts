import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipList} from '@angular/material';

import { TechSkill, DB_SKILLS, API_SKILLS, LANGUAGE_SKILLS } from '../models/tech-skill';


export interface ITechSkill
{
  skillCategoryId: number,
  name: string,
  skillLevel: string,
  sortOrder: number
}


@Component({
  selector: 'app-wizard-skills',
  templateUrl: './wizard-skills.component.html',
  styleUrls: ['./wizard-skills.component.css']
})
export class WizardSkillsComponent implements OnInit {
  @Input('skillType')
  skill: number;
  
  get singularName() {
    switch(this.skill)
    {
      case LANGUAGE_SKILLS:
        return 'Language';
        break;
      case API_SKILLS:
        return 'API';
        break;
      case DB_SKILLS:
        return 'Database';
        break;
    }
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  entryLevelSkills: TechSkill[] = [];
  proficientLevelSkills: TechSkill[] = [];
  expertLevelSkills: TechSkill[] = [];

  skillsFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.skillsFormGroup = this._formBuilder.group({
      entrySkills: [''],
      proficientSkills: [''],
      expertSkills: ['']
    });
   }

  ngOnInit() {
  }
  
  add(event: MatChipInputEvent, skillLevel: string): void {
    const input = event.input;
    const value = event.value;

    var selectedSkills: TechSkill[];

    switch(skillLevel)
    {
      case 'Entry':
        selectedSkills = this.entryLevelSkills;
      break;
      case 'Proficient':
        selectedSkills = this.proficientLevelSkills;
      break;
      case 'Expert':
        selectedSkills = this.expertLevelSkills;
      break;
    }

    // Add our skill
    if ((value || '').trim()) {
      selectedSkills.push({
        id: 0,
        userId: 0,
        skillCategoryId: 0,
        name: value.trim(),
        skillLevel: skillLevel,
        sortOrder: 0
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: TechSkill, skillLevel: string): void {    
    var selectedSkills: TechSkill[];

    switch(skillLevel)
    {
      case 'Entry':
        selectedSkills = this.entryLevelSkills;
      break;
      case 'Proficient':
        selectedSkills = this.proficientLevelSkills;
      break;
      case 'Expert':
        selectedSkills = this.expertLevelSkills;
      break;
    }

    const index = selectedSkills.indexOf(skill);

    if (index >= 0) {
      selectedSkills.splice(index, 1);
    }
  }
}
