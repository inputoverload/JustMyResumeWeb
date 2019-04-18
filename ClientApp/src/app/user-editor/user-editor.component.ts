import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MaterialModule } from '../material';

import { User } from '../models/user';
import { UserService, DialogData } from '../dataServices/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  userForm = this.fb.group ({
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
  });
    user: User;
  
    async getUser(id: number) {
      this.user = await this.userService.getUser(id);
      this.displayValues();
    }

  displayValues()
  {
    this.userForm.get('firstName').setValue(this.user.firstName);
    this.userForm.get('lastName').setValue(this.user.lastName);
    this.userForm.get('streetAddress').setValue(this.user.streetAddress);
    this.userForm.get('streetAddress2').setValue(this.user.streetAddress2);
    this.userForm.get('city').setValue(this.user.city);
    this.userForm.get('state').setValue(this.user.state);
    this.userForm.get('zipCode').setValue(this.user.zipCode);
    this.userForm.get('phone').setValue(this.user.phone);
    this.userForm.get('phone2').setValue(this.user.phone2);
    this.userForm.get('email').setValue(this.user.email);
  }

  retrieveValues()
  {
    this.user.firstName = this.userForm.get('firstName').value;
    this.user.lastName = this.userForm.get('lastName').value;
    this.user.streetAddress = this.userForm.get('streetAddress').value;
    this.user.streetAddress2 = this.userForm.get('streetAddress2').value;
    this.user.city = this.userForm.get('city').value;
    this.user.state = this.userForm.get('state').value;
    this.user.zipCode = this.userForm.get('zipCode').value;
    this.user.phone = this.userForm.get('phone').value;
    this.user.phone2 = this.userForm.get('phone2').value;
    this.user.email = this.userForm.get('email').value;
  }

  onSubmit() {
    this.retrieveValues();
    this.userService.updateUser(this.user);
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<UserEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private dlgData: DialogData,
    private fb: FormBuilder,
    private userService: UserService) { }

  async ngOnInit() {
    await this.getUser(this.dlgData.userId);
  }

}
