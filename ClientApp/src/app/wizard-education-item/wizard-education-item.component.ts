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
  columnsToDiplay = ['description', 'actions'];

  constructor(private _formBuilder: FormBuilder, private _dataService: EducationService) {
    this.educationItemsFormGroup = this._formBuilder.group({
      description: [''],
      degree: ['']
    });
  }

  ngOnInit() {
    this.loadData();
    this.addNew();
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
    this.currentItem.userId = this.userId;
    this.currentItem.description = "";
  }

  cancel() {
    this.addNew();
  }

  public loadData() {
    if (this.userId === 0) {
      this.items = [];
    } else {
      this._dataService.getUserEducationItems(this.userId).subscribe(items => this.items = items);
    }
  }

  save() {
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    this.retrieveData();

    if (!this.currentItem.id) {
      this._dataService.addEducationItem(this.currentItem).subscribe(
        item => { return; },
        error => alert('An error occurred while saving: ' + error.message),
        () => {
          this.items.push(this.currentItem);
          this.addNew();
        }
      );
    } else {
      this._dataService.updateEducationItem(this.currentItem);
      this.addNew();
    }
  }

  edit(description: string) {
    this.currentItem = this.findItem(description);
    this.displayData();
  }

  findItem(description: string): EducationItem {
    return this.items.find(item => item.description == description);
  }

  delete(description: string) {
    let item: EducationItem = this.findItem(description);
    this._dataService.deleteEducationItem(item.id);

    let index: number = this.items.indexOf(item);
    this.items.splice(index, 1);

    this.addNew();
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
