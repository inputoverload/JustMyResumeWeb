import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from '../material'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { UserComponent } from '../user/user.component';
import { TechSkillComponent } from '../tech-skill/tech-skill.component';
import { JobComponent } from '../job/job.component';
import { EducationComponent } from '../education/education.component';
import { ProjectComponent } from '../project/project.component';
import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  selector: 'app-resume-summary',
  templateUrl: './resume-summary.component.html',
  styleUrls: ['./resume-summary.component.css']
})
export class ResumeSummaryComponent implements OnInit {
  userId: number;

  constructor(private activeRoute: ActivatedRoute, 
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');
  }

  editUser(): void {
    this.router.navigateByUrl(`/resume/wizard/${this.userId}`);
  }

}
