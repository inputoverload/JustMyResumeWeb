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

  private _entrySkills: TechSkill[] = null;
  private _proficientSkills: TechSkill[] = null;
  private _expertSkills: TechSkill[] = null;
  private _allSkills: TechSkill[] = null;
  private _deletedItems: TechSkill[] = [];
  private skillCategoryId: number = 0;

  skillCategories: SkillCategory[];

  skillsFormGroup: FormGroup;

  initializeSkills() {
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
    this.skillCategoryId = this.skillCategories.filter(item => item.name === skillName)[0].id;
    this._entrySkills = this._allSkills.filter(item => item.skillCategoryId === this.skillCategoryId && item.skillLevel === 'Entry');
    this._proficientSkills = this._allSkills.filter(item => item.skillCategoryId === this.skillCategoryId && item.skillLevel === 'Proficient');
    this._expertSkills = this._allSkills.filter(item => item.skillCategoryId === this.skillCategoryId && item.skillLevel === 'Expert');
  }

  constructor(private _formBuilder: FormBuilder,
    private _skillService: TechSkillService,
    private _categoryService: SkillCategoryService) {
    this.skillsFormGroup = this._formBuilder.group({
      entrySkills: [''],
      proficientSkills: [''],
      expertSkills: ['']
    });
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this._categoryService.getSkillCategories().subscribe(values => this.skillCategories = values,
      error => console.log('error:' + error),
      () => this._skillService.getTechSkills(this.userId).subscribe(values => this._allSkills = values,
        error => console.log("Error: ", error),
        () => this.initializeSkills()
      )
    );
  }

  cancel() {
    this.loadData();
  }

  save() {
    let skills: TechSkill[] = [];
    let id: number;

    skills = skills.concat(this._entrySkills, this._proficientSkills, this._expertSkills);
    for (let item of skills) {
      if (item.id < 1) {
        this._skillService.addTechSkill(item);
      } else {
        this._skillService.updateTechSkill(item);
      }
    }

    for (let item of this._deletedItems) {
      this._skillService.deleteTechSkill(item.id);
    }

    this.loadData();
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
        skillCategoryId: this.skillCategoryId,
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

    alert('here');

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
      if (skill.id > 0) {
        this._deletedItems.push(skill);
      }
    }
  }
}
