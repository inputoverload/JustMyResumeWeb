import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TechSkill } from '../models/tech-skill';
import { TechSkillService } from '../dataServices/tech-skill.service';

import { SkillCategory } from '../models/skill-category';
import { SkillCategoryService } from '../dataServices/skill-category.service';

@Component({
  selector: 'app-tech-skill',
  templateUrl: './tech-skill.component.html',
  styleUrls: ['./tech-skill.component.css']
})
export class TechSkillComponent implements OnInit {
  private userId: number;
  public techSkills: TechSkill[];
  skillCategories: SkillCategory[];
  columnsToDisplay = ['name','skillLevel'];

  async getTechSkills(id: number)
  {
    try {
      this.techSkills = await this.techSkillService.getUserTechSkills(id);
    } catch (error) {
      console.warn(`Error occurred getting Tech Skills for User #${this.userId}`);
    }
  }

  async getSkillCategories()
  {
    try {
      this.skillCategories = await this.skillCategoryService.getSkillCategories();
    } catch (error) {
      console.warn(`Error occurred fetching Tech Skill Categories: ${error.message}`);
    }
  }

  filterTechSkills(id: number): Array<TechSkill>
  {
    if(this.techSkills == null) return;

    return this.techSkills.filter(skill => skill.skillCategoryId === id);
  }

  constructor(private activeRoute: ActivatedRoute, 
              private techSkillService: TechSkillService,
              private skillCategoryService: SkillCategoryService,
              private location: Location) {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.getTechSkills(this.userId);
    await this.getSkillCategories();
  }

}
