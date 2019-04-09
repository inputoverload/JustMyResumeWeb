import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MaterialModule } from '../material';
import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';

@Component({
  selector: 'app-wizard-user',
  templateUrl: './wizard-user.component.html',
  styleUrls: ['./wizard-user.component.css']
})
export class WizardUserComponent implements OnInit {
  userFormGroup: FormGroup;
  user: User;
  userId: number;

  constructor(private activeRoute: ActivatedRoute,
                private location: Location,
                private router: Router, 
                private _formBuilder: FormBuilder,
                private _dataService: UserService) {

    this.userFormGroup = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      streetAddress: [''],
      streetAddress2: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      phone: [''],
      phone2: [''],
      email: ['']
    }); }

  ngOnInit() {
    this.retrieveUserId();
    this.loadData();
  }

  finishInit() {
    this.displayData();
  }

  save() {
    let isNew: boolean = this.user.id < 1;

    this.retrieveData();
    if (isNew) {
      this._dataService.addUser(this.user).subscribe(
        item => this.user = item,
        error => alert('An error occurred while saving: ' + error.message),
        () => this.router.navigateByUrl(`/resume/wizard/${this.user.id}`)
      );
    } else {
      this._dataService.updateUser(this.user);
    }
  }

  cancel() {
    this.router.navigateByUrl('/resume/1');
    return;
  }

  retrieveData() {
    this.user.firstName = this.userFormGroup.get("firstName").value;
    this.user.lastName = this.userFormGroup.get("lastName").value;
    this.user.streetAddress = this.userFormGroup.get("streetAddress").value;
    this.user.streetAddress2 = this.userFormGroup.get("streetAddress2").value;
    this.user.city = this.userFormGroup.get("city").value;
    this.user.state = this.userFormGroup.get("state").value;
    this.user.zipCode = this.userFormGroup.get("zipCode").value;
    this.user.phone = this.userFormGroup.get("phone").value;
    this.user.phone2 = this.userFormGroup.get("phone2").value;
    this.user.email = this.userFormGroup.get("email").value;
  }

  displayData() {
     this.userFormGroup.get("firstName").setValue(this.user.firstName);
     this.userFormGroup.get("lastName").setValue(this.user.lastName);
     this.userFormGroup.get("streetAddress").setValue(this.user.streetAddress);
     this.userFormGroup.get("streetAddress2").setValue(this.user.streetAddress2);
     this.userFormGroup.get("city").setValue(this.user.city);
     this.userFormGroup.get("state").setValue(this.user.state);
     this.userFormGroup.get("zipCode").setValue(this.user.zipCode);
    this.userFormGroup.get("phone").setValue(this.user.phone);
    this.userFormGroup.get("phone2").setValue(this.user.phone2);
     this.userFormGroup.get("email").setValue(this.user.email);
  }

  clearData() {
    this.userFormGroup.get("firstName").setValue('');
    this.userFormGroup.get("lastName").setValue('');
    this.userFormGroup.get("streetAddress").setValue('');
    this.userFormGroup.get("streetAddress2").setValue('');
    this.userFormGroup.get("city").setValue('');
    this.userFormGroup.get("state").setValue('');
    this.userFormGroup.get("zipCode").setValue('');
    this.userFormGroup.get("phone").setValue('');
    this.userFormGroup.get("phone2").setValue('');
    this.userFormGroup.get("email").setValue('');
  }

  retrieveUserId() {
    let id: number;
    id = +this.activeRoute.snapshot.paramMap.get('id');
    if (id == undefined) {
      id = 0;
    }

    this.userId = id;
  }

  loadData() {
    if (this.userId < 1) {
      this.user = new User();
      this.user.id = 0;
    } else {
      this._dataService.getUser(this.userId)
        .subscribe(item => this.user = item,
          error => console.log("Error: ", error),
        () => this.finishInit());
    }
  }

}
