import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

import { MaterialModule } from '../material';
import { EducationItem } from '../models/education';
import { EducationService } from '../dataServices/education.service';

@Component({
  selector: 'app-wizard-education-item',
  templateUrl: './wizard-education-item.component.html',
  styleUrls: ['./wizard-education-item.component.css']
})
export class WizardEducationItemComponent implements OnInit {
  @Input('userId')
  userId: number;

  educationItemsFormGroup: FormGroup;
  currentItem: EducationItem;
  newItemId: number = 0;

  pageIndex: number = 0;
  pageSize: number = 5;
  lowValue: number = 0;
  highValue: number = 5;

  items: EducationItem[] = [];
  deletedItems: EducationItem[] = [];
  columnsToDiplay = ['description', 'actions'];

  constructor(private _formBuilder: FormBuilder, private _dataService: EducationService) {
    this.educationItemsFormGroup = this._formBuilder.group({
      description: [''],
      degree: ['']
    });
  }

  ngOnInit() {
    this.loadData();
  }

  displayData() {
    this.educationItemsFormGroup.get("description").setValue(this.currentItem.description);
    this.educationItemsFormGroup.get("degree").setValue(this.currentItem.degree);
  }

  retrieveData() {
    this.currentItem.description = this.educationItemsFormGroup.get("description").value;
    this.currentItem.degree = this.educationItemsFormGroup.get("degree").value;
    this.currentItem.userId = this.userId;
  }

  clearData() {
    this.educationItemsFormGroup.get("description").setValue('');
    this.educationItemsFormGroup.get("degree").setValue('');
  }

  addNew() {
    this.clearData();
    this.currentItem = new EducationItem();
  }

  cancel() {
    this.currentItem = null;
    this.clearData();
  }

  save() {
    if (this.currentItem == null) {
      alert("You must click Add New or Edit before you can enter education information.");
      return;
    }
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    if (this.currentItem.id == undefined || this.currentItem.id == 0) {
      this.currentItem.id = --this.newItemId;
      this.items.push(this.currentItem);
    }

    this.retrieveData();

    this.clearData();
    this.currentItem = null;
  }

  edit(description: string) {
    this.currentItem = this.findItem(description);
    this.displayData();
  }

  findItem(description: string): EducationItem {

    return this.items.find<EducationItem>(item => item.description == description);
  }

  delete(description: string) {
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    let item: EducationItem = this.findItem(description);
    let index: number = this.items.indexOf(item);
    this.items.splice(index, 1);

    if (item.id < 1) {
      return;
    } else {
      this.deletedItems.push(item);
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

  public saveData() {
    let item: EducationItem;

    for (let i: number; this.items.length > i; i++) {
      item = this.items[i];
      this._dataService.updateEducationItem(item);
    }

    for (let i: number; this.deletedItems.length > i; i++) {
      item = this.items[i];
      this._dataService.deleteEducationItem(item.id);
    }

  }

  public loadData() {
    this.deletedItems = [];
    if (this.userId === 0) {
      this.items = [];
    } else {
      this._dataService.getEducationItems(this.userId).subscribe(items => this.items = items);
    }
  }

}
