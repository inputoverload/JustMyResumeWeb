import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';
import { LoginService } from '../dataServices/login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

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
  pageEvent: any;

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<BrowserUsersComponent>,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    try {

      this.users = await this.userService.getUsers();
      this.dataSource = new MatTableDataSource(this.users);
      this.columnsToDisplay = ['lastName', 'firstName', 'city', 'state', 'actions'];
      this.JWT = this.loginService.JWT;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
