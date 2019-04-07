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

  getEducationItems(id: number)
  {
    this.educationService.getEducationItems(id).subscribe(history => this.educationItems = history);
  }
  constructor(private activeRoute: ActivatedRoute, 
              private educationService: EducationService,
              private location: Location) { }

  ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getEducationItems(id);
  }

}
