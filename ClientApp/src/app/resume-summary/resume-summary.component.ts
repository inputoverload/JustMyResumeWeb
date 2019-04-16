import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from '../material'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { LoginService } from '../dataServices/login.service';
import { BrowserUsersComponent } from '../browser-users/browser-users.component';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-resume-summary',
  templateUrl: './resume-summary.component.html',
  styleUrls: ['./resume-summary.component.css']
})
export class ResumeSummaryComponent implements OnInit {
  state$: Observable<object>;
  userId: number;

  get WebToken() {
    return this.loginService.JWT;
  }

  constructor(
    private activeRoute: ActivatedRoute, 
    private location: Location,
    private router: Router,
    private loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userId = +this.activeRoute.snapshot.paramMap.get('id');

    let jwt: string;
    this.activeRoute.fragment.subscribe(item => jwt = item);
    if (jwt != null && this.loginService.JWT == null) {
      this.loginService.JWT = jwt;
    }
  }

  editUser(): void {
    this.router.navigateByUrl(`/resume/wizard/${this.userId}`);
  }

  logout(): void {
    this.router.navigateByUrl("/login");
  }

  isLoggedIn(): boolean {
    return (this.loginService.JWT ? true : false);
  }

  displayBrowser(): void {
    const dialogRef = this.dialog.open(BrowserUsersComponent, {
      width: '600px',
      data: { JWT: this.loginService.JWT }
    });
  }

  addNew(): void {
    this.router.navigateByUrl("/resume/wizard/0");
  }

}
