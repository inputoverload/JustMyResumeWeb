import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';
import { MaterialModule } from '../material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  async getUser(id: number) {
    try {
      this.user = await this.userService.getUser(id);
    } catch (error) {
      console.warn(`Error loading User #${id}: ${error.message}`);
    }
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {
  }

  async ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    await this.getUser(id);
  }

}
