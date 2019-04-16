import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';

import { ResumeSummaryComponent } from './resume-summary/resume-summary.component';
import { ResumeWizardComponent } from './resume-wizard/resume-wizard.component';
import { LoginComponent } from './login/login.component';
import { BrowserUsersComponent } from './browser-users/browser-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'resume/1', pathMatch: 'full' },
  { path: 'resume/:id', component: ResumeSummaryComponent, canActivate: [AuthGuard] },
  { path: 'resume/wizard/:id', component: ResumeWizardComponent, canActivate: [AuthGuard] },
  { path: 'resumes', component: BrowserUsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
