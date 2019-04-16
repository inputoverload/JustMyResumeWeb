import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from '../material'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-resume-summary',
  templateUrl: './resume-summary.component.html',
  styleUrls: ['./resume-summary.component.css']
})
export class ResumeSummaryComponent implements OnInit {
  userId: number;

  get WebToken {
    return localStorage.getItem("jwt");
  }

  constructor(private activeRoute: ActivatedRoute, 
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');
  }

  editUser(): void {
    this.router.navigateByUrl(`/resume/wizard/${this.userId}`);
  }

  logout(): void {
    localStorage.removeItem("jwt");
    this.router.navigateByUrl("/login");
  }

  isLoggedIn(): boolean {
    return (localStorage.getItem("jwt") ? true : false);
  }

  displayBrowser(): void {
    this.router.navigateByUrl("/resumes");
  }

  addNew(): void {
    this.router.navigateByUrl("/resume/wizard/0");
  }

}
