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
  public techSkills: TechSkill[];
  skillCategories: SkillCategory[];
  columnsToDisplay = ['name','skillLevel'];

  getTechSkills(id: number)
  {
    this.techSkillService.getUserTechSkills(id).subscribe(skills => this.techSkills = skills);
  }

  getSkillCategories()
  {
    this.skillCategoryService.getSkillCategories().subscribe(skillCategories => this.skillCategories = skillCategories);
  }

  filterTechSkills(id: number): TechSkill[]
  {
    if(this.techSkills == null) return;
    
    return this.techSkills.filter(skill => skill.skillCategoryId === id);
  }

  constructor(private activeRoute: ActivatedRoute, 
              private techSkillService: TechSkillService,
              private skillCategoryService: SkillCategoryService,
    private location: Location) {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getTechSkills(id);

    this.getSkillCategories();
  }

  ngOnInit() {
  }

}
