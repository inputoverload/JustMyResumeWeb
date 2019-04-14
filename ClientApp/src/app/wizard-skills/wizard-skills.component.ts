import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

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
  separatorKeysCodes = [ENTER];

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
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    try {
      this.skillCategories = await this._categoryService.getSkillCategories();
      this._allSkills = await this._skillService.getUserTechSkills(this.userId);
      this.initializeSkills();
    } catch (error) {
      console.warn(`An error occurred while fetching Skills and Skill Categories: ${error.message}`);
    }
  }

  /*
   * With adds and deletes we update the database immediately. There are no updates. Since
   * TechSkill only has one user-entered property they can just delete and re-enter instead
   * of updating.
   */ 
  async saveItem(items: TechSkill[], item: TechSkill) {
    if (this.userId < 1) {
      alert('You must save the personal information on the first step before saving anything else.');
      return;
    }

    try {
      items.push(await this._skillService.addTechSkill(item));      
    } catch (error) {
      console.warn(`An error occurred while inserting TechSkill: ${error.message}`);
    }
  }
  
  async add(event: MatChipInputEvent, skillLevel: string): void {
    if (this.userId < 1) {
      alert('You must save the personal information on the first step before saving anything else.');
      return;
    }

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
      let item: TechSkill = {
        id: 0,
        userId: this.userId,
        skillCategoryId: this.skillCategoryId,
        name: value.trim(),
        skillLevel: skillLevel,
        sortOrder: 0
      };

      await this.saveItem(selectedSkills, item);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  async remove(skill: TechSkill, skillLevel: string): void {    
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
      let deleted: TechSkill = selectedSkills[index];
      try {
        await this._skillService.deleteTechSkill(deleted.id);
      } catch (error) {
        console.warn(`An error occurred deleting Tech Skill #${deleted.id}.`);
      }
      selectedSkills.splice(index, 1);
    }
  }
}
