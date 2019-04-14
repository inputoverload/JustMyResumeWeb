import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  columnsToDiplay = ['name', 'actions'];

  constructor(private _formBuilder: FormBuilder,
    private _dataService: ProjectService,
    private router: Router
  ) {
    this.projectsFormGroup = this._formBuilder.group({
      name: [''],
      demoUrl: [''],
      gitHubUrl: [''],
      description: ['']
    });
  }

  async ngOnInit() {
    await this.loadData();
    this.addNew();
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
    this.currentItem.userId = this.userId;
    this.currentItem.name = "";
  }

  cancel() {
    this.addNew();
  }

  public async loadData() {
    if (this.userId === 0) {
      this.items = [];
    } else {
      this.items = await this._dataService.getUserProjects(this.userId);
    }
  }

  async save() {
    if (this.userId === 0) {
      alert("You must save the personal information on the first step before saving anything else.");
      return;
    }

    this.retrieveData();

    if (!this.currentItem.id) {
      try {
        this.items.push(await this._dataService.addProject(this.currentItem));
        this.addNew();
      } catch (error) {
        alert('An error occurred while saving: ' + error.message);
      }
    } else {
      await this._dataService.updateProject(this.currentItem);
      this.addNew();
    }
  }

  edit(name: string) {
    this.currentItem = this.findItem(name);
    this.displayData();
  }

  findItem(name: string): Project {
    return this.items.find(item => item.name == name);
  }

  async delete(name: string) {
    let item: Project = this.findItem(name);
    await this._dataService.deleteProject(item.id);

    let index: number = this.items.indexOf(item);
    this.items.splice(index, 1);

    this.addNew();
  }

  finish() {
    this.router.navigateByUrl(`/resume/${this.userId}`);
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
