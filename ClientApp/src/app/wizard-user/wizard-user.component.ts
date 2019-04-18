import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';

import { OverlayService } from '../uiServices/overlay/overlay.module';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.module';

import { MaterialModule } from '../material';
import { User } from '../models/user';
import { UserService } from '../dataServices/user.service';
import { LoginService } from '../dataServices/login.service';
import { EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-wizard-user',
  templateUrl: './wizard-user.component.html',
  styleUrls: ['./wizard-user.component.css']
})
export class WizardUserComponent implements OnInit {
  @Output() idUpdated: EventEmitter<any> = new EventEmitter();

  userFormGroup: FormGroup;
  user: User;
  userId: number;

  constructor(private activeRoute: ActivatedRoute,
                private loginService: LoginService,
                private location: Location,
                private router: Router, 
                private _formBuilder: FormBuilder,
                private _dataService: UserService,
                private previewProgressSpinner: OverlayService) {

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

  async ngOnInit() {
    this.retrieveUserId();
    await this.loadData();
  }

  private overlayRef: OverlayRef;
  showBackdrop() {
    let overlayRef = this.previewProgressSpinner.open({ 'hasBackdrop': true },
      ProgressSpinnerComponent);
  }

  hideBackdrop() {
    this.previewProgressSpinner.close();
  }

  finishInit() {
    this.displayData();
  }

  async save() {
    let isNew: boolean = this.user.id < 1;

    this.showBackdrop();

    try {
      this.retrieveData();
      if (isNew) {
        this.user = await this._dataService.addUser(this.user);
        this.idUpdated.emit(this.user.id);

        this.router.navigate([`/resume/wizard`, `${this.user.id}`], { fragment: this.loginService.JWT });
      } else {
        await this._dataService.updateUser(this.user);
      }
    } catch (error) {
      console.warn(`Error occurred saving user ${this.userId}: ${error.message}`);
    }

    this.hideBackdrop();

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

  async loadData() {
    if (this.userId < 1) {
      this.user = new User();
      this.user.id = 0;
    } else {
      this.user = await this._dataService.getUser(this.userId);
      this.finishInit();
    }
  }

}
