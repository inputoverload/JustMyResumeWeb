import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResumeSummaryComponent } from './resume-summary/resume-summary.component';
import { ResumeWizardComponent } from './resume-wizard/resume-wizard.component';

const routes: Routes = [
  { path: '', redirectTo: 'resume/1', pathMatch: 'full' },
  { path: 'resume/:id', component: ResumeSummaryComponent },
  { path: 'add/resume', component: ResumeWizardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
