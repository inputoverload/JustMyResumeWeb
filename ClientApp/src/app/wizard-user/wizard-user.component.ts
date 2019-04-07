import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material';

import { User } from '../models/user';

@Component({
  selector: 'app-wizard-user',
  templateUrl: './wizard-user.component.html',
  styleUrls: ['./wizard-user.component.css']
})
export class WizardUserComponent implements OnInit {
  userFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

    this.userFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: [''],
      streetAddress2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: [''],
      phone: [''],
      phone2: [''],
      email: ['', Validators.required]
    }); }

  ngOnInit() {
  }

}
