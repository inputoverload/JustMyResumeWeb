import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';

@Component({
  selector: 'app-browser-users',
  templateUrl: './browser-users.component.html',
  styleUrls: ['./browser-users.component.css']
})
export class BrowserUsersComponent implements OnInit {
  users: User[];
  columnsToDisplay: string[];

  constructor(private userService: UserService) { }

  async ngOnInit() {
    try {
      this.columnsToDisplay = ['lastName', 'firstName', 'city', 'state'];

      this.users = await this.userService.getUsers();
    } catch (error) {
      console.warn(`An error occurred while loading the resumes: ${error.message}`);
    }
  }

}
