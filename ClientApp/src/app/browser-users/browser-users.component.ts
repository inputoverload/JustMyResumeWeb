import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';
import { LoginService } from '../dataServices/login.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-browser-users',
  templateUrl: './browser-users.component.html',
  styleUrls: ['./browser-users.component.css']
})
export class BrowserUsersComponent implements OnInit {
  JWT: string;

  users: User[];
  columnsToDisplay: string[];

  pageIndex: number = 0;
  pageSize: number = 5;
  lowValue: number = 0;
  highValue: number = 5;

  constructor(
    public dialogRef: MatDialogRef<BrowserUsersComponent>,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      this.columnsToDisplay = ['lastName', 'firstName', 'city', 'state', 'actions'];

      this.users = await this.userService.getUsers();
      this.JWT = this.loginService.JWT;
    } catch (error) {
      console.warn(`An error occurred while loading the resumes: ${error.message}`);
    }
  }

  getPaginatorData(event) {

    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

}
