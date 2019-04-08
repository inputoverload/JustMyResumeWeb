import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipList} from '@angular/material';

import { TechSkill } from '../models/tech-skill';
import { TechSkillService } from '../dataServices/tech-skill.service';
import { SkillCategoryService } from '../dataServices/skill-category.service';
import { SkillCategory } from '../models/skill-category';


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
  @Input('userId')
  userId: number;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  get entryLevelSkills() {
    return this._entrySkills;
  }
  get proficientLevelSkills() {
    return this._proficientSkills;
  }
  get expertLevelSkills() {
    return this._expertSkills;
  }

  _entrySkills: TechSkill[] = null;
  _proficientSkills: TechSkill[] = null;
  _expertSkills: TechSkill[] = null;
  _allSkills: TechSkill[] = null;

  skillCategories: SkillCategory[];

  skillsFormGroup: FormGroup;

  initializeSkills() {
    let skillId: number = 0;
    let skillName: String;

    switch (this.skill) {
      case this.LANGUAGE_SKILLS:
        skillName = 'Languages';
        break;
      case this.API_SKILLS:
        skillName = 'APIs';
        break;
      case this.DB_SKILLS:
        skillName = 'Databases';
        break;
    }
    skillId = this.skillCategories.filter(item => item.name === skillName)[0].id;
    this._entrySkills = this._allSkills.filter(item => item.skillCategoryId === skillId && item.skillLevel === 'Entry');
    this._proficientSkills = this._allSkills.filter(item => item.skillCategoryId === skillId && item.skillLevel === 'Proficient');
    this._expertSkills = this._allSkills.filter(item => item.skillCategoryId === skillId && item.skillLevel === 'Expert');   
  }

  constructor(private _formBuilder: FormBuilder,
    private _skillService: TechSkillService, 
    catService: SkillCategoryService) {
    this.skillsFormGroup = this._formBuilder.group({
      entrySkills: [''],
      proficientSkills: [''],
      expertSkills: ['']
    });

    catService.getSkillCategories().subscribe(values => this.skillCategories = values,
      error => console.log('error:' + error),
      () => this._skillService.getTechSkills(this.userId).subscribe(values => this._allSkills = values,
        error => console.log("Error: ", error),
        () => this.initializeSkills()
        )
      ); 
  }

  ngOnInit() {
  }

  get DB_SKILLS() {
    return 1;
  }
  get API_SKILLS() {
    return 2;
  }
  get LANGUAGE_SKILLS() {
    return 3;
  }

  get singularName() {
    switch (this.skill) {
      case this.LANGUAGE_SKILLS:
        return 'Language';
        break;
      case this.API_SKILLS:
        return 'API';
        break;
      case this.DB_SKILLS:
        return 'Database';
        break;
    }
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
        userId: this.userId,
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
