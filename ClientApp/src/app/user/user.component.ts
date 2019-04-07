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

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(user => this.user = user)
  }

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getUser(id);
  }

}
