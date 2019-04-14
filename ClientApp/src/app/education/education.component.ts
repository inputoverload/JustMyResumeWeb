import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EducationItem } from '../models/education';
import { EducationService } from '../dataServices/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationItems: EducationItem[];

  async getEducationItems(id: number)
  {
    this.educationItems = await this.educationService.getUserEducationItems(id);
  }
  constructor(private activeRoute: ActivatedRoute, 
              private educationService: EducationService,
    private location: Location) {
  }

  async ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');

    await this.getEducationItems(id);
  }

}
