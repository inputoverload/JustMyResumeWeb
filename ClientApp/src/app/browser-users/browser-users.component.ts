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

}
