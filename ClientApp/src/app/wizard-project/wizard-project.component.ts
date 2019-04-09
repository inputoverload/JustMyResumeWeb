import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MaterialModule } from '../material';
import { Project } from '../models/project';
import { ProjectService } from '../dataServices/project.service';

@Component({
  selector: 'app-wizard-project',
  templateUrl: './wizard-project.component.html',
  styleUrls: ['./wizard-project.component.css']
})
export class WizardProjectComponent implements OnInit {
  @Input('userId')
  userId: number;

  projectsFormGroup: FormGroup;
  currentItem: Project;
  newItemId: number = 0;

  pageIndex: number = 0;
  pageSize: number = 5;
  lowValue: number = 0;
  highValue: number = 5;

  items: Project[] = [];
  deletedItems: Project[] = [];
  columnsToDiplay = ['name', 'actions'];

  constructor(private _formBuilder: FormBuilder, private _dataService: ProjectService) {
    this.projectsFormGroup = this._formBuilder.group({
      name: [''],
      demoUrl: [''],
      gitHubUrl: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadData();
  }

  displayData() {
    this.projectsFormGroup.get("name").setValue(this.currentItem.name);
    this.projectsFormGroup.get("demoUrl").setValue(this.currentItem.demoUrl);
    this.projectsFormGroup.get("gitHubUrl").setValue(this.currentItem.gitHubUrl);
    this.projectsFormGroup.get("description").setValue(this.currentItem.description);
  }

  retrieveData() {
    this.currentItem.name = this.projectsFormGroup.get("name").value;
    this.currentItem.demoUrl = this.projectsFormGroup.get("demoUrl").value;
    this.currentItem.gitHubUrl = this.projectsFormGroup.get("gitHubUrl").value;
    this.currentItem.description = this.projectsFormGroup.get("description").value;
    this.currentItem.userId = this.userId;
  }

  clearData() {
    this.projectsFormGroup.get("name").setValue('');
    this.projectsFormGroup.get("demoUrl").setValue('');
    this.projectsFormGroup.get("gitHubUrl").setValue('');
    this.projectsFormGroup.get("description").setValue('');
  }

  addNew() {
    this.clearData();
    this.currentItem = new Project();
  }

  cancel() {
    this.currentItem = null;
    this.clearData();
  }

  save() {
    if (this.currentItem == null) {
      alert("You must click Add New or Edit before you can enter project information.");
      return;
    }
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }

    if (this.currentItem.id == undefined || this.currentItem.id == 0) {
      this.currentItem.id = --this.newItemId;
      this.currentItem.userId = this.userId;
      this.items.push(this.currentItem);
    }

    this.retrieveData();

    this.clearData();
    this.currentItem = null;
  }

  edit(name: string) {
    this.currentItem = this.findItem(name);
    this.displayData();
  }

  findItem(name: string): Project {

    return this.items.find<Project>(item => item.name == name);
  }

  delete(name: string) {
    if (this.userId === 0) {
      alert("You must save the personal information on the first page before saving anything else.");
      return;
    }
    let item: Project = this.findItem(name);
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
    let item: Project;

    for (let i: number; this.items.length > i; i++) {
      item = this.items[i];
      this._dataService.updateProject(item);
    }

    for (let i: number; this.deletedItems.length > i; i++) {
      item = this.items[i];
      this._dataService.deleteProject(item.id);
    }

  }

  public loadData() {
    this.deletedItems = [];
    if (this.userId === 0) {
      this.items = [];
    } else {
      this._dataService.getProjects(this.userId).subscribe(items => this.items = items);
    }
  }

}
