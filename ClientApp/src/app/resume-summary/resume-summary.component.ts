import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from '../material'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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

  constructor(private activeRoute: ActivatedRoute, 
              private location: Location,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  editUser(): void {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    
    const dialogRef = this.dialog.open(UserEditorComponent, {height: '400px', width: '600px', data: {userId: id}});
    dialogRef.afterClosed().subscribe(retval => location.reload());
  }

}
