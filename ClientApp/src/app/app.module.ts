import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { ResumeSummaryComponent } from './resume-summary/resume-summary.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserComponent } from './user/user.component';
import { TechSkillComponent } from './tech-skill/tech-skill.component';
import { JobComponent } from './job/job.component';
import { EducationComponent } from './education/education.component';
import { ProjectComponent } from './project/project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WizardJobsComponent } from './wizard-jobs/wizard-jobs.component';
import { WizardUserComponent } from './wizard-user/wizard-user.component';
import { WizardSkillsComponent } from './wizard-skills/wizard-skills.component';
import { WizardEducationItemComponent } from './wizard-education-item/wizard-education-item.component';
import { WizardProjectComponent } from './wizard-project/wizard-project.component';
import { ResumeWizardComponent } from './resume-wizard/resume-wizard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ResumeSummaryComponent,
    UserEditorComponent,
    UserComponent,
    TechSkillComponent,
    JobComponent,
    EducationComponent,
    ProjectComponent,
    TechSkillComponent,
    WizardJobsComponent,
    WizardUserComponent,
    WizardSkillsComponent,
    WizardEducationItemComponent,
    WizardProjectComponent,
    ResumeWizardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
